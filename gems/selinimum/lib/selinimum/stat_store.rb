require "json"
require "aws-sdk"
require "fileutils"
require "tmpdir"

module Selinimum
  module StatStore
    class << self
      S3_PREFIX = "canvas-lms"

      # download stats for the requested sha (and possibly infer the best/
      # closest sha if sha is nil)
      def fetch_stats(sha)
        return unless s3_enabled?

        if sha
          sha = Git.normalize_sha(sha)
        else
          sha = closest_sha
        end
        return unless sha # :(

        json_path = Dir.mktmpdir("selinimum")
        download_stats(sha, json_path)
        {sha: sha, json_path: json_path}
      end

      # once we've downloaded stat files, load them up into memory and
      # merge into a single hash
      def load_stats(directory)
        Dir["#{directory}/*.json"].inject({}) do |result, file|
          result.merge JSON.parse(File.read(file)) do |_, oldval, newval|
            oldval.concat newval
          end
        end
      end

      # find the closest ancestor commit that has spec stats stored in S3
      # (within reason)
      def closest_sha
        recent_shas = Git.recent_shas
        available_shas = Set.new(all_shas)
        recent_shas.detect { |sha| available_shas.include?(sha) }
      end

      # download all the json files stored under canvas-lms/data/<SHA>/
      def download_stats(sha, dest)
        prefix = S3_PREFIX + "/data/" + sha + "/"
        objects = s3.objects
          .as_tree(prefix: prefix)
          .children
          .select(&:leaf?)
          .map(&:object)

        objects.each do |object|
          file_name = object.key.sub(prefix, "")
          File.open("#{dest}/#{file_name}", "wb") do |file|
            object.read do |chunk|
              file.write(chunk)
            end
          end
        end
      end

      # upload stats generated in a given test run
      def save_stats(data, batch_name)
        suffix = Time.now.utc.strftime("%Y%m%d%H%M%S")
        suffix += "-#{batch_name}" if batch_name

        save_file("data/#{Git.head}/stats-#{suffix}.json", data)

        # in jenkins land, a given build can have lots of data files (cuz
        # parallelization). so we track overall build completion/success
        # separately once everything is done. e.g. if one thread has
        # failures, the whole dataset is unreliable, so we don't finalize
        finalize! unless batch_name
      end

      def finalize!
        save_file("builds/#{Git.head}", "ok")
      end

      def save_file(filename, data)
        save_file_locally(filename, data)
        s3.objects["#{S3_PREFIX}/#{filename}"].write data
      end

      def save_file_locally(filename, data)
        filename = "tmp/selinimum/#{filename}"
        FileUtils.mkdir_p(File.dirname(filename))
        File.open(filename, "w") { |f| f.write data }
      end

      # get all the SHAs w/ finalized stats
      def all_shas
        prefix = S3_PREFIX + "/builds/"
        s3.objects
          .as_tree(prefix: prefix)
          .children
          .select(&:leaf?)
          .map { |obj| obj.key.sub(prefix, "") }
      end

      def s3_enabled?
        s3_config[:access_key_id] && s3_config[:access_key_id] != "access_key"
      end

      def s3_config
        @s3_config ||= begin
          config = {
            access_key_id: ENV["SELINIMUM_AWS_ID"],
            secret_access_key: ENV["SELINIMUM_AWS_SECRET"],
            bucket_name: ENV.fetch("SELINIMUM_AWS_BUCKET")
          }
          # fall back to the canvas s3 creds, if provided
          yml_file = "config/amazon_s3.yml"
          if File.exist?(yml_file)
            yml_config = YAML.load_file(yml_file)[ENV["RAILS_ENV"]] || {}
            config[:access_key_id] ||= yml_config["access_key_id"]
            config[:secret_access_key] ||= yml_config["secret_access_key"]
          end
          config
        end
      end

      def s3
        @s3 ||= begin
          AWS::S3.new(s3_config).buckets[s3_config[:bucket_name]]
        end
      end
    end
  end
end

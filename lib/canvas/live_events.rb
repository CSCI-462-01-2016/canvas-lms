module Canvas::LiveEvents
  def self.course_syllabus_updated(course, old_syllabus_body)
    LiveEvents.post_event('syllabus_updated', {
      course_id: course.global_id,
      syllabus_body: LiveEvents.truncate(course.syllabus_body),
      old_syllabus_body: LiveEvents.truncate(old_syllabus_body)
    })
  end

  def self.discussion_entry_created(entry)
    payload = {
      discussion_entry_id: entry.global_id,
      discussion_topic_id: entry.global_discussion_topic_id,
      text: LiveEvents.truncate(entry.message)
    }

    if entry.parent_id
      payload.merge!({
        parent_discussion_entry_id: entry.global_parent_id
      })
    end

    LiveEvents.post_event('discussion_entry_created', payload)
  end

  def self.discussion_topic_created(topic)
    LiveEvents.post_event('discussion_topic_created', {
      discussion_topic_id: topic.global_id,
      is_announcement: topic.is_announcement,
      title: LiveEvents.truncate(topic.title),
      body: LiveEvents.truncate(topic.message)
    })
  end

  def self.group_membership_created(membership)
    LiveEvents.post_event('group_membership_created', {
      group_membership_id: membership.global_id,
      user_id: membership.global_user_id,
      group_id: membership.global_group_id,
      group_name: membership.group.name,
      group_category_id: membership.group.global_group_category_id,
      group_category_name: membership.group.group_category.try(:name)
    })
  end

  def self.group_category_created(group_category)
    LiveEvents.post_event('group_category_created', {
      group_category_id: group_category.global_id,
      group_category_name: group_category.name
    })
  end

  def self.group_created(group)
    LiveEvents.post_event('group_created', {
      group_category_id: group.global_group_category_id,
      group_category_name: group.group_category.try(:name),
      group_id: group.global_id,
      group_name: group.name
    })
  end

  def self.get_assignment_data(assignment)
    {
      assignment_id: assignment.global_id,
      title: LiveEvents.truncate(assignment.title),
      description: LiveEvents.truncate(assignment.description),
      due_at: assignment.due_at,
      unlock_at: assignment.unlock_at,
      lock_at: assignment.lock_at,
      updated_at: assignment.updated_at,
      points_possible: assignment.points_possible
    }
  end

  def self.get_submission_data(submission)
    {
      submission_id: submission.global_id,
      assignment_id: submission.global_assignment_id,
      submitted_at: submission.submitted_at,
      updated_at: submission.updated_at,
      score: submission.score,
      grade: submission.grade,
      submission_type: submission.submission_type,
      body: LiveEvents.truncate(submission.body),
      url: submission.url,
      attempt: submission.attempt
    }
  end

  def self.assignment_created(assignment)
    LiveEvents.post_event('assignment_created', get_assignment_data(assignment))
  end

  def self.submission_created(submission)
    LiveEvents.post_event('submission_created', get_submission_data(submission))
  end

  def self.assignment_updated(assignment)
    LiveEvents.post_event('assignment_updated', get_assignment_data(assignment))
  end

  def self.submission_updated(submission)
    LiveEvents.post_event('submission_updated', get_submission_data(submission))
  end

  def self.logged_in(session)
    LiveEvents.post_event('logged_in', {
      redirect_url: session[:return_to]
    })
  end

  def self.logged_out
    LiveEvents.post_event('logged_out', {})
  end

  def self.quiz_submitted(submission)
    # TODO: include score, for automatically graded portions?
    LiveEvents.post_event('quiz_submitted', {
      submission_id: submission.global_id,
      quiz_id: submission.global_quiz_id
    })
  end

  def self.wiki_page_created(page)
    LiveEvents.post_event('wiki_page_created', {
      wiki_page_id: page.global_id,
      title: LiveEvents.truncate(page.title),
      body: LiveEvents.truncate(page.body)
    })
  end

  def self.wiki_page_updated(page, old_title, old_body)
    payload = {
      wiki_page_id: page.global_id,
      title: page.title,
      body: page.body
    }

    if old_title
      payload[:old_title] = old_title
    end

    if old_body
      payload[:old_body] = old_body
    end

    LiveEvents.post_event('wiki_page_updated', payload)
  end

  def self.wiki_page_deleted(page)
    LiveEvents.post_event('wiki_page_deleted', {
      wiki_page_id: page.global_id,
      title: LiveEvents.truncate(page.title)
    })
  end

  def self.grade_changed(submission, old_grade)
    grader_id = nil
    if submission.grader_id && !submission.autograded?
      grader_id = submission.global_grader_id
    end

    LiveEvents.post_event('grade_change', {
      submission_id: submission.global_id,
      grade: submission.grade,
      old_grade: old_grade,
      grader_id: grader_id,
      student_id: submission.global_user_id
    })
  end

  def self.asset_access(asset, category, role, level)
    asset_subtype = nil
    if asset.is_a?(Array)
      asset_subtype = asset[0]
      asset_obj = asset[1]
    else
      asset_obj = asset
    end

    LiveEvents.post_event('asset_accessed', {
      asset_type: asset_obj.class.reflection_type_name,
      asset_id: asset_obj.global_id,
      asset_subtype: asset_subtype,
      category: category,
      role: role,
      level: level
    })
  end
end

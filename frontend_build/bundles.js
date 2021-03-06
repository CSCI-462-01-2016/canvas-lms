var bundleNames = [
  'account_admin_tools',
  'account_authorization_configs',
  'account_search',
  'account_settings',
  'account_show',
  'account_statistics',
  'add_assignment_group',
  'add_course_or_user',
  'alerts',
  'all_courses',
  'announcements_index',
  'assignments',
  'assignment_edit',
  'assignment_index',
  'assignment_moderation',
  'assignment_show',
  'attendance',
  'calendar2',
  'change_password',
  'collaborations',
  'conferences',
  'confirm_email',
  'content_exports',
  'content_migration',
  'context_modules',
  'context_module_progressions',
  'conversations_new',
  'copy_course',
  'course',
  'course_list',
  'course_settings',
  'course_statistics',
  'course_wizard',
  'dashboard',
  'dashboard_card',
  'datagrid',
  'developer_keys',
  'discussion',
  'discussion_topics_edit',
  'discussion_topics_index',
  'edit_calendar_event',
  'edit_rubric',
  'eportfolio',
  'epub_exports',
  'external_apps',
  'external_tool_redirect',
  'file_inline',
  'file_not_found_bundle',
  'file_preview',
  'file_show',
  'grade_summary',
  'gradebook_history',
  'gradebook_uploads',
  'gradebook2',
  'grading_standards',
  'group_settings',
  'groups',
  'jobs',
  'ldap_settings_test',
  'learning_outcomes',
  'legacy/add_group_category',
  'legacy/assignments_peer_reviews',
  'legacy/calendars_wizard_box',
  'legacy/collaborations_forms',
  'legacy/content_imports_files',
  'legacy/context_media_comment',
  'legacy/context_media_object_inline',
  'legacy/context_roster_usage',
  'legacy/context_roster_user',
  'legacy/context_roster_user_services',
  'legacy/context_undelete_item',
  'legacy/courses_show',
  'legacy/edit_rubric_user_index',
  'legacy/eportfolios_wizard_box',
  'legacy/error_form',
  'legacy/external_content_cancel',
  'legacy/external_content_success',
  'legacy/external_tools_tool_show',
  'legacy/gradebooks_grade_summary',
  'legacy/gradebooks_student_attendance',
  'legacy/inlined_preview',
  'legacy/plugins_error_reporting_settings',
  'legacy/quiz_submission',
  'legacy/rubrics_index',
  'legacy/rubrics_show',
  'legacy/submissions_show_preview_media',
  'legacy/submissions_show_preview_text',
  'legacy/submissions_show_preview_upload',
  'legacy/terms_index',
  'legacy/user_outcome_results',
  'legacy/users_admin_merge',
  'legacy/users_index',
  'legacy/users_registered',
  'link_enrollment',
  'locale',
  'login',
  'manage_avatars',
  'manage_groups',
  'manage_groups2',
  'messages',
  'moderate_quiz',
  'module_sequence_footer',
  'navigation_header',
  'notification_preferences',
  'oauth2_confirm',
  'otp_login',
  'page_views',
  'plugins',
  'prerequisites_lookup',
  'profile',
  'profile_show',
  'question_bank',
  'question_banks',
  'quiz_history',
  'quiz_show',
  'quiz_statistics',
  'quiz_statistics_cqs',
  'quiz_submission_events',
  'quizzes_bundle',
  'quizzes_index',
  'react_files',
  'react_gradebook',
  'react_groups',
  'react_outcome_alignment',
  'registration',
  'registration_confirmation',
  'roles',
  'roster',
  'rubric_assessment',
  'section',
  'select_content_dialog',
  'self_enrollment',
  'sis_import',
  'smartbanner',
  'speed_grader',
  'student_group_dialog',
  'styleguide',
  'sub_accounts',
  'submission_download',
  'submissions',
  'submit_assignment',
  'syllabus',
  'take_quiz',
  'teacher_activity_report',
  'theme_editor',
  'theme_preview',
  'user',
  'user_lists',
  'user_logins',
  'user_name',
  'user_notes',
  'user_observees',
  'wiki_page_edit',
  'wiki_page_index',
  'wiki_page_revisions',
  'wiki_page_show',
  'zip_file_imports'
];

var entries = {};

bundleNames.forEach(function(entry){
  entries[entry] = "./app/coffeescripts/bundles/" + entry + ".coffee";
});

entries['screenreader_gradebook'] = "./public/javascripts/compiled/bundles/screenreader_gradebook.js";

var glob = require("glob");
var pluginBundlesPattern = __dirname + "/../gems/plugins/*/app/coffeescripts/bundles/*.coffee";
var pluginBundles = glob.sync(pluginBundlesPattern, []);
var pluginNameRegexp = /plugins\/([^/]+)\/app/;
var fileNameRegexp = /\/([^/]+)\.coffee/;
pluginBundles.forEach(function(entryFilepath){
  var pluginName = pluginNameRegexp.exec(entryFilepath)[1];
  var fileName = fileNameRegexp.exec(entryFilepath)[1];
  var bundleName = pluginName + "-" + fileName;
  entries[bundleName] = entryFilepath;
});


entries['instructure-common'] = [
  'ajax_errors',
  'coffeescripts/bundles/common',
  'classnames',
  'compiled/helpDialog',
  'compiled/badge_counts',
  'compiled/behaviors/activate',
  'compiled/behaviors/admin-links',
  'compiled/behaviors/authenticity_token',
  'compiled/behaviors/elementToggler',
  'compiled/behaviors/instructure_inline_media_comment',
  'compiled/behaviors/ping',
  'compiled/behaviors/tooltip',
  'compiled/behaviors/ujsLinks',
  'compiled/collections/AssignmentOverrideCollection',
  'compiled/collections/DateGroupCollection',
  'compiled/collections/GroupUserCollection',
  'compiled/editor/stocktiny',
  'compiled/grade_calculator',
  'compiled/jquery/ModuleSequenceFooter',
  'compiled/jquery/serializeForm',
  'compiled/license_help',
  'compiled/models/Assignment',
  'compiled/models/grade_summary/CalculationMethodContent',
  'compiled/models/AssignmentOverride',
  'compiled/models/DateGroup',
  'compiled/models/Group',
  'compiled/models/Outcome',
  'compiled/models/Progress',
  'compiled/models/Pseudonym',
  'compiled/models/Section',
  'compiled/models/TurnitinSettings',
  'compiled/models/User',
  'compiled/PandaPub',
  'compiled/registration/incompleteRegistrationWarning',
  'compiled/tours',
  'compiled/util/brandableCss',
  'compiled/util/DateValidator',
  'compiled/util/PandaPubPoller',
  'compiled/util/Popover',
  'compiled/util/round',
  'compiled/views/CollectionView',
  'compiled/views/DialogBaseView',
  'compiled/views/DialogFormView',
  'compiled/views/editor/KeyboardShortcuts',
  'compiled/views/MessageStudentsDialog',
  'compiled/views/PaginatedCollectionView',
  'compiled/views/PaginatedView',
  'compiled/views/PublishButtonView',
  'compiled/views/PublishIconView',
  'compiled/views/TreeBrowserView',
  'compiled/views/ValidatedFormView',
  'compiled/views/ValidatedMixin',
  'i18nObj',
  'instructure',
  'jquery.instructure_forms',
  'jquery.toJSON',
  'jst/_avatar',
  'jst/collectionView',
  'jst/DialogFormWrapper',
  'jst/editor/KeyboardShortcuts',
  'jst/EmptyDialogFormWrapper',
  'jst/ExternalTools/_external_tool_menuitem',
  'jst/messageStudentsDialog',
  'jst/outcomes/_calculationMethodExample',
  'jst/paginatedCollection',
  'jst/PaginatedView',
  'jsx/shared/helpers/createStore',
  'link_enrollment',
  'LtiThumbnailLauncher',
  'media_comments',
  'page_views',
  'reminders'
];

entries['vendor'] = [
  'Backbone',
  'bower/classnames/index',
  'bower/handlebars/handlebars.runtime',
  'handlebars',
  'jquery',
  'jquery.ajaxJSON',
  'jquery.fancyplaceholder',
  'jquery.google-analytics',
  'jqueryui/autocomplete',
  'jqueryui/effects/drop',
  'jqueryui/progressbar',
  'jqueryui/tabs',
  'moment',
  'react',
  'react-modal',
  'react-router',
  'underscore',
  'vendor/backbone-identity-map',
  'vendor/backbone',
  'vendor/date',
  'vendor/d3.v3',
  'vendor/firebugx',
  'vendor/graphael',
  'vendor/i18n',
  'vendor/i18n_js_extension',
  'vendor/jquery-1.7.2',
  'vendor/jquery.ba-hashchange',
  'vendor/jquery.ba-tinypubsub',
  'vendor/jquery.cookie',
  'vendor/jquery.pageless',
  'vendor/jquery.scrollTo',
  'vendor/mediaelement-and-player',
  'vendor/raphael',
  'vendor/redux',
  'vendor/redux-promise',
  'vendor/slickgrid/slick.grid',
  'vendor/slickgrid/slick.editors',
  'vendor/slickgrid/plugins/slick.rowselectionmodel',
  'vendor/swfobject/swfobject'
];

module.exports = entries;

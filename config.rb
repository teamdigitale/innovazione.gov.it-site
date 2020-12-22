require "dotenv"

require "lib/path_helpers"
require "lib/image_helpers"

Dotenv.load

page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

set :url_root, ENV.fetch("BASE_URL")

ignore "/templates/*"

LOCALES = ["it"]
activate :i18n, langs: LOCALES, mount_at_root: LOCALES[0].intern

activate :asset_hash
activate :directory_indexes
activate :pagination
activate :inline_svg

activate :dato, token: ENV.fetch("DATO_API_TOKEN"), live_reload: true

webpack_command =
  if build?
    "yarn run build"
  else
    "yarn run dev"
  end

activate :external_pipeline,
  name: :webpack,
  command: webpack_command,
  source: ".tmp/dist",
  latency: 1

configure :build do
  activate :minify_html do |html|
    html.remove_input_attributes = false
  end
  activate :search_engine_sitemap,
    default_priority: 0.5,
    default_change_frequency: "weekly"
end

configure :development do
  activate :livereload
end

module PresentationHelper
  def self.published_announcements(announcements)
    announcements.sort_by(&:date_shown).reverse
  end

  def self.published_articles(articles)
    articles.sort_by(&:date_shown).reverse
  end

  def self.published_department_subpages(department_subpages)
    department_subpages.sort_by(&:position)
  end

  def self.published_focus_pages(focus_pages)
    focus_pages.sort_by(&:position)
  end

  def self.published_general_pages(general_pages)
    general_pages.sort_by(&:position)
  end

  def self.published_interviews(interviews)
    interviews.sort_by(&:date_shown).reverse
  end

  def self.published_minister_subpages(minister_subpages)
    minister_subpages.sort_by(&:position)
  end

  def self.published_news_subpages(news_subpages)
    news_subpages.sort_by(&:position)
  end

  def self.published_participations(participations)
    participations.sort_by(&:date_shown).reverse
  end

  def self.published_press_releases(press_releases)
    press_releases.sort_by(&:date_shown).reverse
  end

  def self.published_projects_categories(projects_categories)
    projects_categories.sort_by(&:position)
  end

  def self.published_projects(projects)
    projects.sort_by(&:position)
  end

  def self.published_projects_subpages(projects_subpages)
    projects_subpages.sort_by(&:position)
  end

  def self.published_schedule_events(schedule_events)
    schedule_events.sort_by(&:agenda_date).reverse
  end

  def self.published_tags(tags)
    tags.sort_by(&:name)
  end
end

helpers do
  include PathHelpers
  include ImageHelpers

  def visible_announcements
    PresentationHelper.published_announcements(dato.announcements)
  end

  def visible_articles
    PresentationHelper.published_articles(dato.articles)
  end

  def visible_department_subpages
    PresentationHelper.published_department_subpages(dato.department_subpages)
  end

  def visible_focus_pages
    PresentationHelper.published_focus_pages(dato.focus_pages)
  end

  def visible_interviews
    PresentationHelper.published_interviews(dato.interviews)
  end

  def visible_minister_subpages
    PresentationHelper.published_minister_subpages(dato.minister_subpages)
  end

  def visible_news_subpages
    PresentationHelper.published_news_subpages(dato.news_subpages)
  end

  def visible_participations
    PresentationHelper.published_participations(dato.participations)
  end

  def visible_press_releases
    PresentationHelper.published_press_releases(dato.press_releases)
  end

  def visible_projects_categories
    PresentationHelper.published_projects_categories(dato.projects_categories)
  end

  def visible_projects
    PresentationHelper.published_projects(dato.projects)
  end

  def visible_projects_subpages
    PresentationHelper.published_projects_subpages(dato.projects_subpages)
  end

  def visible_schedule_events
    PresentationHelper.published_schedule_events(dato.schedule_events)
  end

  def visible_tags
    PresentationHelper.published_tags(dato.tags)
  end

end

proxy "/contact/index.html",
  "templates/contact_page.html"

proxy "site.webmanifest",
  "templates/site.webmanifest",
  :layout => false

proxy "browserconfig.xml",
  "templates/browserconfig.xml",
  :layout => false

proxy "/_redirects",
  "/templates/redirects.txt",
  :layout => false

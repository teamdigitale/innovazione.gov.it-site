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

  # Custom helper to theme
  def site_nav_menu
    [
      # dato.about_page,
      # dato.contact_page
    ]
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

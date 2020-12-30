require "dotenv"

require "lib/path_helpers"
require "lib/image_helpers"
require "lib/text_helpers"

Dotenv.load

page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

set :url_root, ENV.fetch("BASE_URL")
set :markdown_engine, :redcarpet

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
  include TextHelpers

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

  def menu_label_with_fallback(page)
    if page.respond_to?(:menu_label) && page.menu_label.present?
      page.menu_label
    elsif page.respond_to?(:name) && page.name.present?
      page.name
    end
  end

  def cta_label(item)
    item.cta_label.present? ? item.cta_label : item.title
  end

end

dato.tap do |dato|
  locale = LOCALES[0]
  I18n.with_locale(locale) do
    prefix = locale == LOCALES[0] ? "" : "/#{locale}"

    proxy "#{prefix}/index.html",
      "/templates/homepage.html",
      locals: { page: dato.homepage },
      locale: locale

    proxy "#{prefix}/#{dato.search_page.slug}/index.html",
      "/templates/search.html",
      locals: { page: dato.search_page },
      locale: locale

    dato.general_pages.each do |general_page|
      parent_path = general_page.parent ? "/#{general_page.parent.slug}" : ""
      proxy "#{prefix}/#{parent_path}/#{general_page.slug}/index.html",
        "/templates/page.html",
        locals: { page: general_page },
        locale: locale
    end

    proxy "#{prefix}/#{dato.minister_page.slug}/index.html",
      "/templates/minister.html",
      locals: { page: dato.minister_page },
      locale: locale

    proxy "#{prefix}/#{dato.minister_page.slug}/#{dato.schedule_page.slug}/index.html",
      "/templates/schedule.html",
      locals: { page: dato.schedule_page },
      locale: locale

    PresentationHelper.published_schedule_events(dato.schedule_events).each do |schedule_event|
      proxy "#{prefix}/#{dato.minister_page.slug}/#{dato.schedule_page.slug}/#{schedule_event.slug}/index.html",
        "/templates/schedule_event.html",
        locals: { page: schedule_event },
        locale: locale
    end

    proxy "#{prefix}/#{dato.minister_page.slug}/#{dato.minister_articles_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.minister_articles_index,
        elements: PresentationHelper.published_articles(dato.articles).select{|a| a.owners.include?(dato.minister_page)}},
      locale: locale

    proxy "#{prefix}/#{dato.minister_page.slug}/#{dato.minister_interviews_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.minister_interviews_index,
        elements: PresentationHelper.published_interviews(dato.interviews).select{|i| i.owners.include?(dato.minister_page)}},
      locale: locale

    proxy "#{prefix}/#{dato.minister_page.slug}/#{dato.minister_participations_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.minister_participations_index,
        elements: PresentationHelper.published_participations(dato.participations).select{|p| p.owners.include?(dato.minister_page)}},
      locale: locale

    proxy "#{prefix}/#{dato.minister_page.slug}/#{dato.minister_press_releases_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.minister_press_releases_index,
        elements: PresentationHelper.published_press_releases(dato.press_releases).select{|p| p.owners.include?(dato.minister_page)}},
      locale: locale

    PresentationHelper.published_minister_subpages(dato.minister_subpages).each do |minister_subpage|
      parent_path = minister_subpage.parent ? "/#{minister_subpage.parent.slug}" : ""
      proxy "#{prefix}/#{dato.minister_page.slug}#{parent_path}/#{minister_subpage.slug}/index.html",
        "/templates/page.html",
        locals: { page: minister_subpage },
        locale: locale
    end

    proxy "#{prefix}/#{dato.department_page.slug}/index.html",
      "/templates/department.html",
      locals: { page: dato.department_page },
      locale: locale

    proxy "#{prefix}/#{dato.department_page.slug}/#{dato.focus_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.focus_index,
        elements: PresentationHelper.published_focus_pages(dato.focus_pages)},
      locale: locale

    PresentationHelper.published_focus_pages(dato.focus_pages).each do |focus_page|
      proxy "#{prefix}/#{dato.department_page.slug}/#{dato.focus_index.slug}/#{focus_page.slug}/index.html",
        "/templates/focus.html",
        locals: { page: focus_page },
        locale: locale
    end

    proxy "#{prefix}/#{dato.department_page.slug}/#{dato.department_announcements_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.department_announcements_index,
        elements: PresentationHelper.published_announcements(dato.announcements).select{|a| a.owners.include?(dato.department_page)}},
      locale: locale

    proxy "#{prefix}/#{dato.department_page.slug}/#{dato.department_articles_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.department_articles_index,
        elements: PresentationHelper.published_articles(dato.articles).select{|a| a.owners.include?(dato.department_page)}},
      locale: locale

    proxy "#{prefix}/#{dato.department_page.slug}/#{dato.department_press_releases_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.department_press_releases_index,
        elements: PresentationHelper.published_press_releases(dato.press_releases).select{|p| p.owners.include?(dato.department_page)}},
      locale: locale

    PresentationHelper.published_department_subpages(dato.department_subpages).each do |department_subpage|
      parent_path = department_subpage.parent ? "/#{department_subpage.parent.slug}" : ""
      proxy "#{prefix}/#{dato.department_page.slug}#{parent_path}/#{department_subpage.slug}/index.html",
        "/templates/page.html",
        locals: { page: department_subpage },
        locale: locale
    end

    proxy "#{prefix}/#{dato.projects_page.slug}/index.html",
      "/templates/projects.html",
      locals: { page: dato.projects_page },
      locale: locale

    PresentationHelper.published_projects(dato.projects).each do |project|
      proxy "#{prefix}/#{dato.projects_page.slug}/#{project.slug}/index.html",
        "/templates/project.html",
        locals: { page: project },
        locale: locale
    end

    PresentationHelper.published_projects_subpages(dato.projects_subpages).each do |projects_subpage|
      parent_path = projects_subpage.parent ? "/#{projects_subpage.parent.slug}" : ""
      proxy "#{prefix}/#{dato.projects_page.slug}#{parent_path}/#{projects_subpage.slug}/index.html",
        "/templates/page.html",
        locals: { page: projects_subpage },
        locale: locale
    end

    proxy "#{prefix}/#{dato.news_page.slug}/index.html",
      "/templates/news.html",
      locals: { page: dato.news_page },
      locale: locale

    proxy "#{prefix}/#{dato.news_page.slug}/#{dato.announcements_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.announcements_index,
        elements: PresentationHelper.published_announcements(dato.announcements)},
      locale: locale

    PresentationHelper.published_announcements(dato.announcements).each do |announcement|
      proxy "#{prefix}/#{dato.news_page.slug}/#{dato.announcements_index.slug}/#{announcement.slug}/index.html",
        "/templates/announcement.html",
        locals: { page: announcement },
        locale: locale
    end

    proxy "#{prefix}/#{dato.news_page.slug}/#{dato.articles_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.articles_index,
        elements: PresentationHelper.published_articles(dato.articles)},
      locale: locale

    PresentationHelper.published_articles(dato.articles).each do |article|
      proxy "#{prefix}/#{dato.news_page.slug}/#{dato.articles_index.slug}/#{article.slug}/index.html",
        "/templates/article.html",
        locals: { page: article },
        locale: locale
    end

    proxy "#{prefix}/#{dato.news_page.slug}/#{dato.interviews_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.interviews_index,
        elements: PresentationHelper.published_interviews(dato.interviews)},
      locale: locale

    PresentationHelper.published_interviews(dato.interviews).each do |interview|
      proxy "#{prefix}/#{dato.news_page.slug}/#{dato.interviews_index.slug}/#{interview.slug}/index.html",
        "/templates/interview.html",
        locals: { page: interview },
        locale: locale
    end

    proxy "#{prefix}/#{dato.news_page.slug}/#{dato.participations_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.participations_index,
        elements: PresentationHelper.published_participations(dato.participations)},
      locale: locale

    PresentationHelper.published_participations(dato.participations).each do |participation|
      proxy "#{prefix}/#{dato.news_page.slug}/#{dato.participations_index.slug}/#{participation.slug}/index.html",
        "/templates/participation.html",
        locals: { page: participation },
        locale: locale
    end

    proxy "#{prefix}/#{dato.news_page.slug}/#{dato.press_releases_index.slug}/index.html",
      "/templates/index_page.html",
      locals: { page: dato.press_releases_index,
        elements: PresentationHelper.published_press_releases(dato.press_releases)},
      locale: locale

    PresentationHelper.published_press_releases(dato.press_releases).each do |press_release|
      proxy "#{prefix}/#{dato.news_page.slug}/#{dato.press_releases_index.slug}/#{press_release.slug}/index.html",
        "/templates/press_release.html",
        locals: { page: press_release },
        locale: locale
    end

    PresentationHelper.published_news_subpages(dato.news_subpages).each do |news_subpage|
      parent_path = news_subpage.parent ? "/#{news_subpage.parent.slug}" : ""
      proxy "#{prefix}/#{dato.news_page.slug}#{parent_path}/#{news_subpage.slug}/index.html",
        "/templates/page.html",
        locals: { page: news_subpage },
        locale: locale
    end

    proxy "#{prefix}/#{dato.tags_index.slug}/index.html",
      "/templates/tags.html",
      locals: { page: dato.tags_index },
      locale: locale

    PresentationHelper.published_tags(dato.tags).each do |tag|
      proxy "#{prefix}/#{dato.tags_index.slug}/#{tag.slug}/index.html",
        "/templates/tag.html",
        locals: { page: tag },
        locale: locale
    end
  end
end

proxy "site.webmanifest",
  "templates/site.webmanifest",
  :layout => false

proxy "browserconfig.xml",
  "templates/browserconfig.xml",
  :layout => false

proxy "/_redirects",
  "/templates/redirects.txt",
  :layout => false

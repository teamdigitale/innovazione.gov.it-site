# frozen_string_literal: true

require "dotenv"
require "lib/path_helpers"
require "lib/image_helpers"
require "lib/text_helpers"

Dotenv.load

page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

ENV["TZ"] = "Europe/Rome"

set :url_root, ENV.fetch("BASE_URL")
set :markdown_engine, :redcarpet

ignore "/templates/*"

LOCALES = %w[it en].freeze
activate :i18n, langs: LOCALES, mount_at_root: LOCALES[0].intern

activate :asset_hash
activate :directory_indexes
activate :pagination

RETRY_CLASSES = [
  Faraday::ClientError,
  Faraday::ConnectionFailed,
  Net::OpenTimeout,
  NoMethodError,
  SocketError
].freeze

def retry_on_error(limit: 5)
  tries ||= 1
  yield
rescue *RETRY_CLASSES => e
  if tries < limit
    warn "#### Error: #{e}, tried #{tries} times"
    tries += 1
    retry
  end
  raise e
end

DATO_ENV = ENV.has_key?("DATO_ENV") ? ENV.fetch("DATO_ENV") : nil

retry_on_error(limit: 10) do
  activate :dato,
           token: ENV.fetch("DATO_API_TOKEN"),
           live_reload: true,
           preview: ENV.fetch("BUILD_ENV") != "production",
           environment: "dataviz"
           #environment: DATO_ENV
end

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
  # activate :livereload
  activate :search_engine_sitemap,
           default_priority: 0.5,
           default_change_frequency: "weekly"
end

# Item selection functions
module PresentationHelper
  def self.published_announcements(announcements)
    announcements.sort_by(&:date_shown).reverse
  end

  def self.published_articles(articles)
    articles.select(&:slug).sort_by(&:date_shown).reverse
  end

  def self.published_pages(pages)
    pages.select(&:slug).sort_by(&:position)
  end

  def self.published_work_positions(work_positions)
    open, others = work_positions.partition { |p| p.announcement_status.name == "APERTO"}
    open_sorted = open.select(&:slug).sort_by(&:date_shown).reverse
    others_sorted = others.select(&:slug).sort_by(&:date_shown).reverse
    open_sorted + others_sorted
  end

  def self.published_children_pages(page)
    page.children.select(&:slug).sort_by(&:position)
  end

  def self.published_focus_pages(focus_pages)
    focus_pages.sort_by(&:position)
  end

  def self.published_interviews(interviews)
    interviews.select(&:slug).sort_by(&:date_shown).reverse
  end

  def self.published_participations(participations)
    participations.select(&:slug).sort_by(&:date_shown).reverse
  end

  def self.published_press_releases(press_releases)
    press_releases.select(&:slug).sort_by(&:date_shown).reverse
  end

  def self.published_projects_categories(projects_categories)
    projects_categories.sort_by(&:position)
  end

  def self.published_projects(projects)
    projects.sort_by(&:position).reject do |project|
      !project.state_block.empty? && project.state_block.first.completed == true
    end
  end

  def self.published_completed_projects(projects)
    (projects.select do |project|
      !project.state_block.empty? && project.state_block.first.completed == true
    end).sort_by { |project| project.state_block.first.date_completed}.reverse
  end

  def self.published_schedule_events(schedule_events)
    schedule_events.sort_by(&:date_shown)
  end

  def self.published_tags(tags)
    tags.sort_by(&:name)
  end

  def self.published_redirects(redirects)
    redirects.select(&:old_url)
  end

  def self.published_videos(videos)
    videos.select(&:slug).sort_by(&:date_shown).reverse
  end

  def self.path_without_domain(url)
    url.gsub("https://innovazione.gov.it", "")
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

  def visible_focus_pages
    PresentationHelper.published_focus_pages(dato.focus_pages)
  end

  def visible_interviews
    PresentationHelper.published_interviews(dato.interviews)
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

  def visible_completed_projects
    PresentationHelper.published_completed_projects(dato.projects)
  end

  def visible_schedule_events
    PresentationHelper.published_schedule_events(dato.schedule_events)
  end

  def visible_videos
    PresentationHelper.published_videos(dato.videos)
  end

  def visible_work_positions
    PresentationHelper.published_work_positions(dato.work_positions)
  end

  def past_events
    visible_schedule_events.reverse.select do |event|
      event.date_shown < DateTime.now
    end
  end

  def current_and_past_events
    visible_schedule_events.reverse.select do |event|
      event.date_shown <= DateTime.now
    end
  end

  def current_and_future_events
    visible_schedule_events.select do |event|
      event.date_shown >= DateTime.now
    end
  end

  def nearest_date
    return current_and_future_events.first.date_shown unless current_and_future_events.empty?
  end

  def days_in_minister_schedule
    days = (visible_schedule_events.each_with_object([]) do |event, daily_arr|
      daily_arr << event.date_shown.strftime("%d%B%Y")
    end)
    days.uniq!
  end

  def schedule_events_by_day
    days_in_minister_schedule.each_with_object({}) do |day, hash|
      hash[day] = (visible_schedule_events.select do |e|
        e.date_shown.strftime("%d%B%Y") == day
      end)
    end
  end

  def months_in_minister_schedule
    m = (visible_schedule_events.each_with_object([]) do |e, arr|
      arr << e.date_shown.strftime("%B%Y")
    end)
    m.uniq!
  end

  def schedule_events_by_month
    months_in_minister_schedule.each_with_object({}) do |month, h|
      h[month] = (schedule_events_by_day.select do |k, v|
        k.downcase.include?(month.downcase)
      end)
    end
  end

  def visible_taggable_contents
    (visible_announcements +
    visible_articles +
    visible_interviews +
    visible_participations +
    visible_press_releases +
    visible_projects +
    visible_completed_projects +
    visible_focus_pages +
    visible_videos +
    visible_schedule_events +
    visible_work_positions +
    visible_pages(dato.general_pages) +
    visible_pages(dato.minister_subpages) +
    visible_pages(dato.undersecretary_subpages) +
    visible_pages(dato.department_subpages) +
    visible_pages(dato.projects_subpages) +
    visible_pages(dato.news_subpages))
  end

  def visible_tags
    PresentationHelper.published_tags(dato.tags) &
      visible_taggable_contents.collect(&:tags).flatten
  end

  def featured_tags
    visible_tags & dato.company.featured_tags
  end

  def visible_pages(pages)
    PresentationHelper.published_pages(pages)
  end

  def visible_fl_pages(pages)
    PresentationHelper.published_pages(pages).reject(&:parent)
  end

  def links_to_existing_page?(link)
    if link.link.respond_to?(:slug)
      link.link.slug
    else
      true
    end
  end

  def visible_links(links)
    links.select { |l| links_to_existing_page?(l) }
  end

  def menu_label_with_fallback(page)
    if page.respond_to?(:menu_label) && page.menu_label.present?
      page.menu_label
    elsif page.respond_to?(:name) && page.name.present?
      page.name
    elsif page.respond_to?(:title) && page.title.present?
      HTML_Truncator.truncate(page.title, 5)
    end
  end

  def project_link_label(link)
    if link.cta_label.present?
      link.cta_label
    else
      t("link_labels.website")
    end
  end

  def cta_label(item)
    item.cta_label.present? ? item.cta_label : item.title
  end

  def editorial_models_api_keys
    %w[announcement
       article
       interview
       participation
       press_release
       focus_page
       project
       video
       general_page
       work_position
       work_positions_index
       minister_subpage
       undersecretary_subpage
       department_subpage
       italy2026_subpage
       innovate_subpage
       projects_subpage
       news_subpage]
  end

  def page_is_editorial(page)
    editorial_models_api_keys.include?(page.item_type.api_key)
  end

  def explore_models_api_keys
    %w[tags_index tag explore_page]
  end

  def page_is_explore(page)
    explore_models_api_keys.include?(page.item_type.api_key)
  end

  def anchor_id(title)
    return "" if !title

    title.parameterize
  end

  def show_update_date_api_keys
    %w[focus_page
       project
       general_page
       work_position
       minister_subpage
       undersecretary_subpage
       department_subpage
       italy2026_subpage
       innovate_subpage
       projects_subpage
       news_subpage]
  end

  def page_show_update_date?(page)
    show_update_date_api_keys.include?(page.item_type.api_key)
  end

  def show_update_date_in_preview_api_keys
    %w[announcement
       article
       interview
       participation
       press_release]
  end

  def page_show_update_date_in_preview?(page)
    show_update_date_in_preview_api_keys.include?(page.item_type.api_key)
  end

  def all_index_pages
    [dato.articles_index,
     dato.announcements_index,
     dato.interviews_index,
     dato.work_positions_index,
     dato.participations_index,
     dato.press_releases_index,
     dato.focus_index,
     dato.projects_page,
     #dato.completed_projects_index,
     dato.videos_index
    ]
  end

  def sharable_socials
    %w[facebook twitter linkedin whatsapp]
  end

  def localizable_api_keys
    %w[article
       interview
       participation
       press_release
       general_page
       work_position
       innovate_subpage
       minister_subpage
       undersecretary_subpage
       department_subpage
       italy2026_subpage
       projects_subpage
       news_subpage
       video]
  end

  def page_is_localizable?(page)
    localizable_api_keys.include?(page.item_type.api_key)
  end

  def main_locale?(locale)
    locale == locales[0]
  end

  def in_italian_zone(time)
    time.in_time_zone(ENV["TZ"])
  end
end

dato.tap do |dato|
  I18n.with_locale(:en) do
    locale = :en
    I18n.fallbacks[:en] = [:en]

    visible_articles = PresentationHelper.published_articles(dato.articles)
    visible_interviews = PresentationHelper.published_interviews(dato.interviews)
    visible_participations = PresentationHelper.published_participations(dato.participations)
    visible_press_releases = PresentationHelper.published_press_releases(dato.press_releases)
    visible_general_pages = PresentationHelper.published_pages(dato.general_pages)
    visible_minister_subpages = PresentationHelper.published_pages(dato.minister_subpages)
    visible_undersecretary_subpages = PresentationHelper.published_pages(dato.undersecretary_subpages)
    visible_department_subpages = PresentationHelper.published_pages(dato.department_subpages)
    visible_italy2026_subpages = PresentationHelper.published_pages(dato.italy2026_subpages)
    visible_innovate_subpages = PresentationHelper.published_pages(dato.innovate_subpages)
    visible_projects_subpages = PresentationHelper.published_pages(dato.projects_subpages)
    visible_news_subpages = PresentationHelper.published_pages(dato.news_subpages)
    visible_resource_redirects = PresentationHelper.published_redirects(dato.resource_redirects)
    visible_videos = PresentationHelper.published_videos(dato.videos)

    visible_innovate_subpages.each do |innovate_subpage|
      parent_path = innovate_subpage.parent ? "/#{innovate_subpage.parent.slug}" : ""
      proxy "/#{dato.innovate_page.slug}#{parent_path}/#{locale}/#{innovate_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: innovate_subpage,
                     children: PresentationHelper.published_children_pages(innovate_subpage)},
            locale: locale
    end

    visible_articles.each do |article|
      proxy "/#{dato.news_page.slug}/#{dato.articles_index.slug}/#{locale}/#{article.slug}/index.html",
            "/templates/article.html",
            locals: {page: article},
            locale: locale
    end

    visible_interviews.each do |interview|
      proxy "/#{dato.news_page.slug}/#{dato.interviews_index.slug}/#{locale}/#{interview.slug}/index.html",
            "/templates/interview.html",
            locals: {page: interview},
            locale: locale
    end

    visible_participations.each do |participation|
      proxy "/#{dato.news_page.slug}/#{dato.participations_index.slug}/#{locale}/#{participation.slug}/index.html",
            "/templates/participation.html",
            locals: {page: participation},
            locale: locale
    end

    visible_press_releases.each do |press_release|
      proxy "/#{dato.news_page.slug}/#{dato.press_releases_index.slug}/#{locale}/#{press_release.slug}/index.html",
            "/templates/press_release.html",
            locals: {page: press_release},
            locale: locale
    end

    visible_videos.each do |video|
      proxy "/#{dato.news_page.slug}/#{dato.videos_index.slug}/#{locale}/#{video.slug}/index.html",
            "/templates/video.html",
            locals: {page: video},
            locale: locale
    end

    visible_general_pages.each do |general_page|
      parent_path = ""
      parent_path = "/#{general_page.parent.slug}" if general_page.parent && general_page.parent.slug.present?

      proxy "#{parent_path}/#{locale}/#{general_page.slug}/index.html",
            "/templates/page.html",
            locals: {page: general_page,
                     children: PresentationHelper.published_children_pages(general_page)},
            locale: locale
    end

    visible_minister_subpages.each do |minister_subpage|
      parent_path = minister_subpage.parent ? "/#{minister_subpage.parent.slug}" : ""
      proxy "/#{dato.minister_page.slug}#{parent_path}/#{locale}/#{minister_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: minister_subpage,
                     children: PresentationHelper.published_children_pages(minister_subpage)},
            locale: locale
    end

    visible_undersecretary_subpages.each do |undersecretary_subpage|
      parent_path = undersecretary_subpage.parent ? "/#{undersecretary_subpage.parent.slug}" : ""
      proxy "/#{dato.undersecretary_page.slug}#{parent_path}/#{locale}/#{undersecretary_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: undersecretary_subpage,
                     children: PresentationHelper.published_children_pages(undersecretary_subpage)},
            locale: locale
    end

    visible_italy2026_subpages.each do |italy2026_subpage|
      parent_path = italy2026_subpage.parent ? "/#{italy2026_subpage.parent.slug}" : ""
      proxy "/#{dato.italy2026_page.slug}#{parent_path}/#{locale}/#{italy2026_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: italy2026_subpage,
                     children: PresentationHelper.published_children_pages(italy2026_subpage)},
            locale: locale
    end

    visible_department_subpages.each do |department_subpage|
      parent_path = department_subpage.parent ? "/#{department_subpage.parent.slug}" : ""
      proxy "/#{dato.department_page.slug}#{parent_path}/#{locale}/#{department_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: department_subpage,
                     children: PresentationHelper.published_children_pages(department_subpage)},
            locale: locale
    end

    visible_projects_subpages.each do |projects_subpage|
      parent_path = projects_subpage.parent ? "/#{projects_subpage.parent.slug}" : ""
      proxy "/#{dato.projects_page.slug}#{parent_path}/#{locale}/#{projects_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: projects_subpage,
                     children: PresentationHelper.published_children_pages(projects_subpage)},
            locale: locale
    end

    visible_news_subpages.each do |news_subpage|
      parent_path = news_subpage.parent ? "/#{news_subpage.parent.slug}" : ""
      proxy "/#{dato.news_page.slug}#{parent_path}/#{locale}/#{news_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: news_subpage,
                     children: PresentationHelper.published_children_pages(news_subpage)},
            locale: locale
    end

    visible_resource_redirects.each do |resource_redirect|
      path = PresentationHelper.path_without_domain(resource_redirect.old_url)
      proxy "#{path}index.html",
            "/templates/resource_redirect.html",
            locals: {page: resource_redirect},
            locale: locale
    end
  end

  I18n.with_locale(:it) do
    locale = :it

    visible_announcements = PresentationHelper.published_announcements(dato.announcements)
    visible_articles = PresentationHelper.published_articles(dato.articles)
    visible_interviews = PresentationHelper.published_interviews(dato.interviews)
    visible_participations = PresentationHelper.published_participations(dato.participations)
    visible_press_releases = PresentationHelper.published_press_releases(dato.press_releases)
    visible_focus_pages = PresentationHelper.published_focus_pages(dato.focus_pages)
    visible_projects = PresentationHelper.published_projects(dato.projects)
    visible_completed_projects = PresentationHelper.published_completed_projects(dato.projects)
    visible_general_pages = PresentationHelper.published_pages(dato.general_pages)
    visible_innovate_subpages = PresentationHelper.published_pages(dato.innovate_subpages)
    visible_work_positions = PresentationHelper.published_work_positions(dato.work_positions)
    visible_minister_subpages = PresentationHelper.published_pages(dato.minister_subpages)
    visible_undersecretary_subpages = PresentationHelper.published_pages(dato.undersecretary_subpages)
    visible_department_subpages = PresentationHelper.published_pages(dato.department_subpages)
    visible_italy2026_subpages = PresentationHelper.published_pages(dato.italy2026_subpages)
    visible_projects_subpages = PresentationHelper.published_pages(dato.projects_subpages)
    visible_news_subpages = PresentationHelper.published_pages(dato.news_subpages)
    visible_tags = PresentationHelper.published_tags(dato.tags)
    visible_videos = PresentationHelper.published_videos(dato.videos)
    visible_resource_redirects = PresentationHelper.published_redirects(dato.resource_redirects)

    def paginate_with_fallback(
      items,
      index_page,
      parent_page,
      locale,
      per_page,
      index_template = "/templates/index_page.html"
    )
      parent_path = "#{parent_page.slug}/"
      index_path = index_page.slug.to_s
      path = "/#{parent_path}#{index_path}"

      if items.any?
        paginate items,
                 path,
                 index_template,
                 suffix: "/page/:num/index",
                 locals: {page: index_page},
                 per_page: per_page

      else
        proxy "#{path}/index.html",
              index_template,
              locals: {page: index_page},
              locale: locale
      end
    end

    visible_resource_redirects.each do |resource_redirect|
      path = PresentationHelper.path_without_domain(resource_redirect.old_url)
      proxy "#{path}index.html",
            "/templates/resource_redirect.html",
            locals: {page: resource_redirect},
            locale: locale
    end

    proxy "/index.html",
          "/templates/homepage.html",
          locals: {page: dato.homepage},
          locale: locale

    proxy "/#{dato.search_page.slug}/index.html",
          "/templates/search.html",
          locals: {page: dato.search_page},
          locale: locale

    proxy "/#{dato.explore_page.slug}/index.html",
          "/templates/explore.html",
          locals: {page: dato.explore_page},
          locale: locale

    visible_general_pages.each do |general_page|
      parent_path = general_page.parent ? "/#{general_page.parent.slug}" : ""
      proxy "#{parent_path}/#{general_page.slug}/index.html",
            "/templates/page.html",
            locals: {page: general_page,
                     children: PresentationHelper.published_children_pages(general_page)},
            locale: locale
    end

    proxy "/#{dato.completed_projects_index.slug}/index.html",
          "/templates/completed_projects.html",
          locals: {page: dato.completed_projects_index},
          locale: locale

    paginate_with_fallback(visible_completed_projects,
                           dato.completed_projects_index,
                           dato.projects_page,
                           locale,
                           10,
                           "/templates/completed_projects.html")

    visible_completed_projects.each do |completed_project|
      proxy "/#{dato.projects_page.slug}/#{completed_project.slug}/index.html",
            "/templates/project.html",
            locals: {page: completed_project},
            locale: locale
    end

    proxy "/#{dato.schedule_archive_page.slug}/index.html",
          "/templates/archive.html",
          locals: {page: dato.schedule_archive_page},
          locale: locale

    proxy "/#{dato.schedule_page.slug}/index.html",
          "/templates/schedule.html",
          locals: {page: dato.schedule_page},
          locale: locale

    visible_schedule_events = dato.schedule_events.sort_by(&:date_shown)

    current_and_future_events = visible_schedule_events.select do |event|
      event.date_shown >= DateTime.now
    end

    days = (current_and_future_events.each_with_object([]) do |event, daily_arr|
      daily_arr << event.date_shown.strftime("%d %B %Y")
    end)
    days.uniq!

    events_by_day = (days.each_with_object({}) do |day, h|
      h[day] = (current_and_future_events.select do |e|
        e.date_shown.strftime("%d %B %Y") == day
      end)
    end)

    months = (current_and_future_events.each_with_object([]) do |e, arr|
      arr << e.date_shown.strftime("%B %Y")
    end)
    months.uniq!

    events_by_month = months.each_with_object({}) do |month, h|
      h[month] = (events_by_day.select do |k, v|
        k.downcase.include?(month.downcase)
      end)
    end

    if events_by_month.any?
      paginate events_by_month,
        "/#{dato.schedule_page.slug}",
        "/templates/schedule.html",
        suffix: "/page/:num/index",
        locals: {page: dato.schedule_page},
        per_page: 10

    else
      proxy "#{dato.schedule_page.slug}/index.html",
        "/templates/schedule.html",
        locals: {page: dato.schedule_page},
        locale: locale
    end

    archive_events = visible_schedule_events.reverse.select do |event|
      event.date_shown <= DateTime.now
    end

    days_in_archive = (archive_events.each_with_object([]) do |event, daily_arr|
      daily_arr << event.date_shown.strftime("%d %B %Y")
    end)
    days_in_archive.uniq!

    archive_events_by_day = (days_in_archive.each_with_object({}) do |day, h|
      h[day] = (archive_events.select do |e|
        e.date_shown.strftime("%d %B %Y") == day
      end)
    end)

    months_in_archive = (archive_events.each_with_object([]) do |e, arr|
      arr << e.date_shown.strftime("%B %Y")
    end)
    months_in_archive.uniq!

    archive_events_by_month = months_in_archive.each_with_object({}) do |month, h|
      h[month] = (archive_events_by_day.select do |k, v|
        k.downcase.include?(month.downcase)
      end)
    end

    if archive_events_by_month.any?
      paginate archive_events_by_month,
        "/#{dato.schedule_archive_page.slug}",
        "/templates/archive.html",
        suffix: "/page/:num/index",
        locals: {page: dato.schedule_archive_page},
        per_page: 10

    else
      proxy "#{dato.schedule_archive_page.slug}/index.html",
        "/templates/archive.html",
        locals: {page: dato.schedule_archive_page},
        locale: locale
    end

    PresentationHelper.published_schedule_events(dato.schedule_events).each do |schedule_event|
      proxy "/#{dato.schedule_page.slug}/#{schedule_event.slug}/index.html",
            "/templates/schedule_event.html",
            locals: {page: schedule_event},
            locale: locale
    end

    if dato.undersecretary_page
      proxy "/#{dato.undersecretary_page.slug}/index.html",
            "/templates/undersecretary.html",
            locals: {page: dato.undersecretary_page},
            locale: locale

      undersecretary_articles = visible_articles.select { |a| a.owners.include?(dato.undersecretary_page) }

      paginate_with_fallback(undersecretary_articles,
                            dato.undersecretary_articles_index,
                            dato.undersecretary_page,
                            locale,
                            10)

      undersecretary_interviews = visible_interviews.select { |i| i.owners.include?(dato.undersecretary_page) }

      paginate_with_fallback(undersecretary_interviews,
                            dato.undersecretary_interviews_index,
                            dato.undersecretary_page,
                            locale,
                            10)

      undersecretary_participations = visible_participations.select { |i| i.owners.include?(dato.undersecretary_page) }

      paginate_with_fallback(undersecretary_participations,
                            dato.undersecretary_participations_index,
                            dato.undersecretary_page,
                            locale,
                            10)

      undersecretary_press_releases = visible_press_releases.select { |i| i.owners.include?(dato.undersecretary_page) }

      paginate_with_fallback(undersecretary_press_releases,
                            dato.undersecretary_press_releases_index,
                            dato.undersecretary_page,
                            locale,
                            10)

      visible_undersecretary_subpages.each do |undersecretary_subpage|
        parent_path = undersecretary_subpage.parent ? "/#{undersecretary_subpage.parent.slug}" : ""
        proxy "/#{dato.undersecretary_page.slug}#{parent_path}/#{undersecretary_subpage.slug}/index.html",
              "/templates/page.html",
              locals: {page: undersecretary_subpage,
                      children: PresentationHelper.published_children_pages(undersecretary_subpage)},
              locale: locale
      end
    end

    if dato.minister_page
      proxy "/#{dato.minister_page.slug}/index.html",
            "/templates/minister.html",
            locals: {page: dato.minister_page},
            locale: locale

      minister_articles = visible_articles.select { |a| a.owners.include?(dato.minister_page) }

      paginate_with_fallback(minister_articles,
                            dato.minister_articles_index,
                            dato.minister_page,
                            locale,
                            10)

      minister_interviews = visible_interviews.select { |i| i.owners.include?(dato.minister_page) }

      paginate_with_fallback(minister_interviews,
                            dato.minister_interviews_index,
                            dato.minister_page,
                            locale,
                            10)

      minister_participations = visible_participations.select { |i| i.owners.include?(dato.minister_page) }

      paginate_with_fallback(minister_participations,
                            dato.minister_participations_index,
                            dato.minister_page,
                            locale,
                            10)

      minister_press_releases = visible_press_releases.select { |i| i.owners.include?(dato.minister_page) }

      paginate_with_fallback(minister_press_releases,
                            dato.minister_press_releases_index,
                            dato.minister_page,
                            locale,
                            10)

      visible_minister_subpages.each do |minister_subpage|
        parent_path = minister_subpage.parent ? "/#{minister_subpage.parent.slug}" : ""
        proxy "/#{dato.minister_page.slug}#{parent_path}/#{minister_subpage.slug}/index.html",
              "/templates/page.html",
              locals: {page: minister_subpage,
                      children: PresentationHelper.published_children_pages(minister_subpage)},
              locale: locale
      end
    end

    if dato.department_page
      proxy "/#{dato.department_page.slug}/index.html",
            "/templates/department.html",
            locals: {page: dato.department_page},
            locale: locale

      paginate_with_fallback(visible_focus_pages,
                            dato.focus_index,
                            dato.department_page,
                            locale,
                            10)

      visible_focus_pages.each do |focus_page|
        proxy "/#{dato.department_page.slug}/#{dato.focus_index.slug}/#{focus_page.slug}/index.html",
              "/templates/focus.html",
              locals: {page: focus_page},
              locale: locale
      end

      department_announcements = visible_announcements.select { |i| i.owners.include?(dato.department_page) }

      paginate_with_fallback(department_announcements,
                            dato.department_announcements_index,
                            dato.department_page,
                            locale,
                            10)

      department_articles = visible_articles.select { |i| i.owners.include?(dato.department_page) }

      paginate_with_fallback(department_articles,
                            dato.department_articles_index,
                            dato.department_page,
                            locale,
                            10)

      department_press_releases = visible_press_releases.select { |i| i.owners.include?(dato.department_page) }

      paginate_with_fallback(department_press_releases,
                            dato.department_press_releases_index,
                            dato.department_page,
                            locale,
                            10)

      visible_department_subpages.each do |department_subpage|
        parent_path = department_subpage.parent ? "/#{department_subpage.parent.slug}" : ""
        proxy "/#{dato.department_page.slug}#{parent_path}/#{department_subpage.slug}/index.html",
              "/templates/page.html",
              locals: {page: department_subpage,
                      children: PresentationHelper.published_children_pages(department_subpage)},
              locale: locale
      end
    end

    if dato.italy2026_page
      proxy "/#{dato.italy2026_page.slug}/index.html",
            "/templates/italy2026.html",
            locals: {page: dato.italy2026_page},
            locale: locale

      if dato.dataviz_page
        proxy "/#{dato.italy2026_page.slug}/#{dato.dataviz_page.slug}/index.html",
              "/templates/data.html",
              locals: {page: dato.dataviz_page},
              locale: locale
      end
      italy2026_articles = visible_articles.select { |i| i.owners.include?(dato.italy2026_page) }

      paginate_with_fallback(italy2026_articles,
                             dato.italy2026_articles_index,
                             dato.italy2026_page,
                             locale,
                             10)

      italy2026_press_releases = visible_press_releases.select { |i| i.owners.include?(dato.italy2026_page) }

      paginate_with_fallback(italy2026_press_releases,
                             dato.italy2026_press_releases_index,
                             dato.italy2026_page,
                             locale,
                             10)

      italy2026_announcements = visible_announcements.select { |i| i.owners.include?(dato.italy2026_page) }

      paginate_with_fallback(italy2026_announcements,
                             dato.italy2026_announcements_index,
                             dato.italy2026_page,
                             locale,
                             10)

      visible_italy2026_subpages.each do |italy2026_subpage|
        if italy2026_subpage.template == "dashboard"
          parent_path = italy2026_subpage.parent ? "/#{italy2026_subpage.parent.slug}" : ""
          proxy "/#{dato.italy2026_page.slug}#{parent_path}/#{italy2026_subpage.slug}/index.html",
                "/templates/data.html",
                locals: {page: italy2026_subpage,
                        children: PresentationHelper.published_children_pages(italy2026_subpage)},
                locale: locale
        else
          parent_path = italy2026_subpage.parent ? "/#{italy2026_subpage.parent.slug}" : ""
          proxy "/#{dato.italy2026_page.slug}#{parent_path}/#{italy2026_subpage.slug}/index.html",
                "/templates/page.html",
                locals: {page: italy2026_subpage,
                        children: PresentationHelper.published_children_pages(italy2026_subpage)},
                locale: locale
        end
      end
    end

    if dato.innovate_page
      published_inn_subpages = PresentationHelper.published_pages(dato.innovate_subpages)
      proxy "/#{dato.innovate_page.slug}/index.html",
            "/templates/innovate.html",
            locals: {page: dato.innovate_page,
                     children: published_inn_subpages},
            locale: locale

      visible_innovate_subpages.each do |innovate_subpage|
        parent_path = innovate_subpage.parent ? "/#{innovate_subpage.parent.slug}" : ""
        proxy "/#{dato.innovate_page.slug}#{parent_path}/#{innovate_subpage.slug}/index.html",
              "/templates/page.html",
              locals: {page: innovate_subpage,
                       children: PresentationHelper.published_children_pages(innovate_subpage)},
              locale: locale
      end

      paginate_with_fallback(visible_work_positions,
                             dato.work_positions_index,
                             dato.innovate_page,
                             locale,
                             10,
                             "/templates/job_positions_index.html")

      visible_work_positions.each do |work_position|
        published_inn_subpages = PresentationHelper.published_pages(dato.innovate_subpages)
        proxy "/#{dato.innovate_page.slug}/#{dato.work_positions_index.slug}/#{work_position.slug}/index.html",
              "/templates/job_position.html",
              locals: {page: work_position, innovate_subpages: published_inn_subpages},
              locale: locale
      end
    end

    proxy "/#{dato.projects_page.slug}/index.html",
          "/templates/projects.html",
          locals: {page: dato.projects_page},
          locale: locale

    visible_projects.each do |project|
      proxy "/#{dato.projects_page.slug}/#{project.slug}/index.html",
            "/templates/project.html",
            locals: {page: project},
            locale: locale
    end

    visible_projects_subpages.each do |projects_subpage|
      parent_path = projects_subpage.parent ? "/#{projects_subpage.parent.slug}" : ""
      proxy "/#{dato.projects_page.slug}#{parent_path}/#{projects_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: projects_subpage,
                     children: PresentationHelper.published_children_pages(projects_subpage)},
            locale: locale
    end

    proxy "/#{dato.news_page.slug}/index.html",
          "/templates/news.html",
          locals: {page: dato.news_page},
          locale: locale

    paginate_with_fallback(visible_announcements,
                           dato.announcements_index,
                           dato.news_page,
                           locale,
                           10)

    visible_announcements.each do |announcement|
      proxy "/#{dato.news_page.slug}/#{dato.announcements_index.slug}/#{announcement.slug}/index.html",
            "/templates/announcement.html",
            locals: {page: announcement},
            locale: locale
    end

    paginate_with_fallback(visible_articles,
                           dato.articles_index,
                           dato.news_page,
                           locale,
                           10)

    visible_articles.each do |article|
      proxy "/#{dato.news_page.slug}/#{dato.articles_index.slug}/#{article.slug}/index.html",
            "/templates/article.html",
            locals: {page: article},
            locale: locale
    end

    paginate_with_fallback(visible_interviews,
                           dato.interviews_index,
                           dato.news_page,
                           locale,
                           10)

    visible_interviews.each do |interview|
      proxy "/#{dato.news_page.slug}/#{dato.interviews_index.slug}/#{interview.slug}/index.html",
            "/templates/interview.html",
            locals: {page: interview},
            locale: locale
    end

    paginate_with_fallback(visible_participations,
                           dato.participations_index,
                           dato.news_page,
                           locale,
                           10)

    visible_participations.each do |participation|
      proxy "/#{dato.news_page.slug}/#{dato.participations_index.slug}/#{participation.slug}/index.html",
            "/templates/participation.html",
            locals: {page: participation},
            locale: locale
    end

    paginate_with_fallback(visible_press_releases,
                           dato.press_releases_index,
                           dato.news_page,
                           locale,
                           10)

    visible_press_releases.each do |press_release|
      proxy "/#{dato.news_page.slug}/#{dato.press_releases_index.slug}/#{press_release.slug}/index.html",
            "/templates/press_release.html",
            locals: {page: press_release},
            locale: locale
    end

    paginate_with_fallback(visible_videos,
                           dato.videos_index,
                           dato.news_page,
                           locale,
                            8,
                           "/templates/video_index.html")

    visible_videos.each do |video|
      proxy "/#{dato.news_page.slug}/#{dato.videos_index.slug}/#{video.slug}/index.html",
            "/templates/video.html",
            locals: {page: video},
            locale: locale
    end

    visible_news_subpages.each do |news_subpage|
      parent_path = news_subpage.parent ? "/#{news_subpage.parent.slug}" : ""
      proxy "/#{dato.news_page.slug}#{parent_path}/#{news_subpage.slug}/index.html",
            "/templates/page.html",
            locals: {page: news_subpage,
                     children: PresentationHelper.published_children_pages(news_subpage)},
            locale: locale
    end

    proxy "/#{dato.tags_index.slug}/index.html",
          "/templates/tags.html",
          locals: {page: dato.tags_index, hide_tags_section: true},
          locale: locale

    taggable_contents = visible_announcements +
                        visible_articles +
                        visible_interviews +
                        visible_participations +
                        visible_press_releases +
                        visible_videos +
                        visible_general_pages +
                        visible_work_positions +
                        visible_minister_subpages +
                        visible_undersecretary_subpages +
                        visible_department_subpages +
                        visible_projects_subpages +
                        visible_news_subpages +
                        visible_schedule_events

    visible_tags.each do |tag|
      items = taggable_contents.select { |n| n.tags.include?(tag) }.sort_by(&:date_shown).reverse

      if items.any?
        paginate items,
                 "/#{dato.tags_index.slug}/#{tag.slug}",
                 "/templates/tag.html",
                 suffix: "/page/:num/index",
                 locals: {page: tag},
                 per_page: 10

      else
        proxy "/#{dato.tags_index.slug}/#{tag.slug}/index.html",
              "/templates/tag.html",
              locals: {page: tag},
              locale: locale
      end
    end
  end

  dato.asset_redirects.each do |asset_redirect|
    path = PresentationHelper.path_without_domain(asset_redirect.old_url)
    proxy "#{path}/index.html",
          "/templates/asset_redirect.html",
          locals: {page: asset_redirect}
  end
end

proxy "site.webmanifest",
      "templates/site.webmanifest",
      layout: false

proxy "browserconfig.xml",
      "templates/browserconfig.xml",
      layout: false

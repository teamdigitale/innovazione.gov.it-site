# frozen_string_literal: true

# Helpers for the construction of paths
module PathHelpers
  module_function

  def locale_path(path = "", locale: I18n.locale)
    File.join("", path_prefix(locale), path, "")
  end

  def page_ancestor(page)
    case page.item_type.api_key

    when "minister_subpage"
      dato.minister_page

    when "undersecretary_subpage"
      dato.undersecretary_page

    when "department_subpage",
      "focus_page"
      dato.department_page

    when "italy2026_subpage"
      dato.italy2026_page

    when "projects_subpage"
      dato.projects_page

    when "innovate_subpage",
      "work_position"
      dato.innovate_page

    when "news_subpage",
      "announcement",
      "article",
      "interview",
      "participation",
      "press_release",
      "video"
      dato.news_page
    end
  end

  def page_parent(page)
    case page.item_type.api_key

    when "minister_subpage",
      "undersecretary_subpage",
      "department_subpage",
      "italy2026_subpage",
      "projects_subpage",
      "news_subpage",
      "general_page",
      "innovate_subpage"
      page.parent

    when "minister_articles_index",
      "minister_interviews_index",
      "minister_participations_index",
      "minister_press_releases_index"
      dato.minister_page

    when "undersecretary_articles_index",
      "undersecretary_interviews_index",
      "undersecretary_participations_index",
      "undersecretary_press_releases_index"
      dato.undersecretary_page

    when "schedule_event"
      dato.schedule_page

    when "department_articles_index",
      "department_announcements_index",
      "department_press_releases_index",
      "focus_index"
      dato.department_page

    when "italy2026_announcements_index",
      "italy2026_articles_index",
      "italy2026_press_releases_index",
      "dataviz_page"
      dato.italy2026_page

    when "work_positions_index"
      dato.innovate_page

    when "work_position"
      dato.work_positions_index

    when "announcements_index",
      "articles_index",
      "interviews_index",
      "participations_index",
      "press_releases_index",
      "videos_index"
      dato.news_page

    when "focus_page"
      dato.focus_index

    when "project",
      "completed_projects_index"
      dato.projects_page

    when "announcement"
      dato.announcements_index

    when "article"
      dato.articles_index

    when "video"
      dato.videos_index

    when "interview"
      dato.interviews_index

    when "participation"
      dato.participations_index

    when "press_release"
      dato.press_releases_index

    when "tag"
      dato.tags_index
    end
  end

  def page_path(page, locale: I18n.locale)
    if page.respond_to?(:slug)
      ancestor_path = page_ancestor(page).nil? ? "" : "#{page_ancestor(page).slug}/"
      parent_path = page_parent(page).nil? ? "" : "#{page_parent(page).slug}/"
      locale_prefix = page_is_localizable?(page) ? path_prefix(locale).to_s : ""
      "/#{ancestor_path}#{parent_path}#{locale_prefix}#{page.slug}"
    else
      "/"
    end
  end

  def page_path_with_anchor(page, anchor)
      anchor ? "#{page_path(page)}#{anchor}" : page_path(page,locale)
  end

  def home_path
    "/"
  end

  def active?(url)
    current_page.url.include? url
  end

  def active_link_to(name, url, options = {})
    url += "/" if !url.end_with?("/")

    options[:class] = "#{options.fetch(:class, '')} active" if active?(url)
    link_to name, url, options
  end

  def base_url
    ENV["BASE_URL"]
  end

  def page_complete_url(page)
    [base_url,
     page_path(page)].join
  end

  def localized_paths_for(page)
    localized_paths = {}
    sitemap.resources.each do |resource|
      next unless resource.is_a?(Middleman::Sitemap::ProxyResource)

      next unless !(current_page.path == "404.html" || current_page.path == "index.html") &&
                  resource.target_resource == page.target_resource &&
                  resource.metadata[:locals] == page.metadata[:locals]

      localized_paths[resource.metadata[:options][:locale]] = resource.url
    end
    localized_paths
  end

  private

  def path_prefix(locale)
    locale == locales[0] ? "" : "#{locale}/"
  end

  def locales
    LOCALES&.split(",")&.map(&:to_sym)
  end
end

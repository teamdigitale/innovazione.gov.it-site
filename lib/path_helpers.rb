module PathHelpers
  module_function

  def locale_path(path = "", locale: I18n.locale)
    File.join("", path_prefix(locale), path, "")
  end

  def page_ancestor(page)
    case page.item_type.api_key

    when 'minister_subpage',
      'schedule_event'
      dato.minister_page

    when 'department_subpage',
      'focus_page'
      dato.department_page

    when 'projects_subpage'
      dato.projects_page

    when 'news_subpage',
      'announcement',
      'article',
      'interview',
      'participation',
      'press_release'
      dato.news_page

    end
  end

  def page_parent(page)
    case page.item_type.api_key

    when 'minister_subpage',
      'department_subpage',
      'projects_subpage',
      'news_subpage',
      'general_page'
      (page.parent if page.parent)

    when 'minister_articles_index',
      'minister_interviews_index',
      'minister_participations_index',
      'minister_press_releases_index',
      'schedule_page'
      dato.minister_page

    when 'schedule_event'
      dato.schedule_page

    when 'department_articles_index',
      'department_announcements_index',
      'department_press_releases_index',
      'focus_index'
      dato.department_page

    when 'announcements_index',
      'articles_index',
      'interviews_index',
      'participations_index',
      'press_releases_index'
      dato.news_page

    when 'focus_page'
      dato.focus_index

    when 'project'
      dato.projects_page

    when 'announcement'
      dato.announcements_index

    when 'article'
      dato.articles_index

    when 'interview'
      dato.interviews_index

    when 'participation'
      dato.participations_index

    when 'press_release'
      dato.press_releases_index

    when 'tag'
      dato.tags_index

    when 'projects_categories'
      dato.projects_categories

    end
  end

  def page_path(page, locale: I18n.locale)
    ancestor_path = page_ancestor(page) != nil ? "#{page_ancestor(page).slug}/" : ""
    parent_path = page_parent(page) != nil ? "#{page_parent(page).slug}/" : ""

    "#{path_prefix(locale)}/#{ancestor_path}#{parent_path}#{page.slug}"
  end

  def active?(url)
    current_page.url.include? url
  end

  def active_link_to(name, url, options = {})
    url += "/" if !url.end_with?("/")

    options[:class] = options.fetch(:class, "") + " active" if active?(url)
    link_to name, url, options
  end

  private

  def path_prefix(locale)
    locale == locales[0] ? "" : "/#{locale}"
  end

  def locales
    if LOCALES
      LOCALES.split(",").map(&:to_sym)
    end
  end
end

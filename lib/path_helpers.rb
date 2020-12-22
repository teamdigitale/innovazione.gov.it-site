module PathHelpers
  module_function

  def locale_path(path = "", locale: I18n.locale)
    File.join("", path_prefix(locale), path, "")
  end

  end

  def active?(url)
    url == current_page.url
  end

  def active_link_to(name, url, options = {})
    url += "/" if !url.end_with?("/")

    options[:class] = options.fetch(:class, "") + " is-active" if active?(url)
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

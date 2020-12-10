module PathHelpers
  module_function

  def root_path
    "/"
  end

  def active?(url)
    url == current_page.url
  end

  def active_link_to(name, url, options = {})
    url += "/" if !url.end_with?("/")

    options[:class] = options.fetch(:class, "") + " is-active" if active?(url)
    link_to name, url, options
  end
end

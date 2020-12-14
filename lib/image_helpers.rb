module ImageHelpers
  module_function

  def favicon_json_path(path, escape = '\/')
    image_path(path).gsub(/\//, escape)
  end

  # attributes = {class: "", id: "", data: {role: {}, title: {}}}
  def icon(name, attributes = {})
    default_attributes = {role: "icon"}
    default_attributes.merge!(attributes.except(:role))
    if attributes.key?(:class)
      default_attributes[:class] += " icon-svg--#{name}"
    else
      default_attributes[:class] ||= "icon-svg--#{name}"
    end

    content_tag(:svg, default_attributes) do
      content_tag(:use, "", "xlink:href" => "#icons-#{name}")
    end
  end
  alias_method :i, :icon

  def image_lazy(image, url_options, sizes = [], attributes = {})
    options = attributes.symbolize_keys
    url_options.merge!({auto: 'format,compress'})

    options[:title] ||= image.title
    options[:alt] ||= image.alt

    sizes_string = sizes.map do |width, size|
      "#{image.url(url_options.merge!({w: width}))} #{size}w"
    end
    options.merge!({
      data: {src: image.url(url_options), srcset: sizes_string.join(", ")}
    })

    image_tag(image.url(url_options.merge!({w: sizes.first.first})), options)
  end

  def image_tag(path, options_hash = {})
    options = options_hash.dup
    if !options.key?(:class)
      options[:class] = "lazyload"
    else
      old_class = options.delete(:class)
      options[:class] = "lazyload #{old_class}"
    end

    super(path, options)
  end
end

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

end

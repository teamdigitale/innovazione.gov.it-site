# frozen_string_literal: true

# Text manipulation helper functions
module TextHelpers
  module_function

  def markdown(content)
    return "" if content.blank?

    markdown = Redcarpet::Markdown.new(Redcarpet::Render::XHTML,
                                       autolink: true, space_after_headers: true)
    new_content = markdown.render(content)
    replace_external_links(new_content)
  end

  def markdown_ext_link(content)
    return "" if content.blank?

    markdown = Redcarpet::Markdown.new(Redcarpet::Render::XHTML,
                                       autolink: true, space_after_headers: true)
    new_content = markdown.render(content)
    add_icon_external_links(new_content)
  end

  WORDS_PER_MINUTE = 180
  SVG = '<svg class="icon icon icon-sm icon-primary ms-2 align-bottom mb-1"><use xlink:href="/images/sprite.svg#it-external-link"/></svg>'

  def article_reading_time(page)
    return 0 if page.item_type.api_key != "article"

    text_blocks = page.content_blocks.select do |block|
      block.item_type.api_key == "block_body_text"
    end

    text = text_blocks.map do |block|
      [block.text_title, block.body_text].join(" ")
    end.join(" ")

    reading_time(text)
  end

  def reading_time(text)
    words = text.split.size
    (words / WORDS_PER_MINUTE).floor
  end

  def add_icon_external_links(content)
    return "" if content.blank?
    doc = Nokogiri::HTML.fragment(content)
    svg = Nokogiri::HTML.fragment(SVG)

    links = doc.search("a")
    links.each do |link|
      link.add_next_sibling SVG
      url = link.attributes["href"].content

      if url.include? ".pdf"
        add_pdf_attributes(link)
      elsif !url.start_with?("/") && !url.include?(ENV["BASE_URL"])
        add_link_attributes(link)
      end
    end

    doc.to_html
  end

  def replace_external_links(content)
    return "" if content.blank?
    doc = Nokogiri::HTML.fragment(content)

    links = doc.search("a")
    links.each do |link|
      url = link.attributes["href"].content

      if url.include? ".pdf"
        add_pdf_attributes(link)
      elsif !url.start_with?("/") && !url.include?(ENV["BASE_URL"])
        add_link_attributes(link)
      end
    end

    doc.to_html
  end

  def add_link_attributes(link)
    link.set_attribute("target", "_blank")
    link.set_attribute("rel", "noopener")

    case link.attributes["href"].content
    when /^mailto/
      link.set_attribute("aria-label",
                         "#{link.content} #{I18n.t('new_email')}")
    when /^http/
      link.set_attribute("aria-label",
                         "#{link.content} #{I18n.t('new_tab')}")
    end

    link
  end

  def add_pdf_attributes(link)
    link.set_attribute("target", "_blank")
    link.set_attribute("rel", "noopener")
    link.attributes["aria-label"]&.remove
    link.set_attribute("aria-label",
                         "#{link.content} #{I18n.t('aria_label_link_pdf')}")

    link.content = "#{link.content} (PDF)"
    link
  end
end

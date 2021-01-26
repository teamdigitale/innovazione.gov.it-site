# frozen_string_literal: true

module TextHelpers
  module_function

  def markdown(content)
    return "" if content.blank?

    markdown = Redcarpet::Markdown.new(Redcarpet::Render::XHTML, autolink: true, space_after_headers: true)
    markdown.render(content)
  end

  WORDS_PER_MINUTE = 180

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
end

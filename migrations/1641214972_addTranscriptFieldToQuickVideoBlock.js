"use strict";

module.exports = async (client) => {
  const quickVideoBlock = await client.itemType.find("block_video_single");

  await client.fields.create(quickVideoBlock.id, {
    label: "Trascrizione",
    apiKey: "transcription",
    fieldType: "text",
    validators: {
      required: {},
    },
    appearance: {
      editor: "markdown",
      parameters: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "code",
          "unordered_list",
          "ordered_list",
          "quote",
          "link",
          "image",
          "fullscreen",
        ],
      },
      addons: [],
    },
  });
};

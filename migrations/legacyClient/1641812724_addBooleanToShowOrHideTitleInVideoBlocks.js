"use strict";

module.exports = async (client) => {
  // Find video content block
  const videoContentBlock = await client.itemType.find("block_video_content");

  // Add boolean to show or hide title to video content block
  await client.fields.create(videoContentBlock.id, {
    label: "Show title",
    apiKey: "show_title",
    fieldType: "boolean",
    validators: {},
    appearance: {
      editor: "boolean",
      parameters: {},
      addons: [],
    },
  });
};

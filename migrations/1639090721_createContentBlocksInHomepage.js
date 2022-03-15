"use strict";

module.exports = async (client) => {
  const focusBlock = await client.itemType.find("block_focus_highlight");
  const Italia2026Block = await client.itemType.find("block_italy2026");
  const ministerBlock = await client.itemType.find("block_minister");
  const homepageModel = await client.itemType.find("homepage");

  await client.fields.create(homepageModel.id, {
    label: "Contenuti",
    apiKey: "content_blocks",
    fieldType: "rich_text",
    validators: {
      richTextBlocks: {
        itemTypes: [focusBlock.id, Italia2026Block.id, ministerBlock.id],
      },
    },
    appearance: {
      editor: "rich_text",
      parameters: {
        start_collapsed: true,
      },
      addons: [],
    },
  });
};

"use strict";

module.exports = async (client) => {
  const focusBlock = await client.itemTypes.create({
    name: "Blocco Focus",
    apiKey: "block_focus_highlight",
    modularBlock: true,
  });

  const focusModel = await client.itemType.find("focus_page");

  await client.fields.create(focusBlock.id, {
    label: "Elemento Focus",
    apiKey: "focus_elements",
    fieldType: "links",
    validators: {
      size: {
        max: 2,
      },
      itemsItemType: {
        item_types: [focusModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });
};

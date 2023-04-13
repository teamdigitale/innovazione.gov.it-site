"use strict";

module.exports = async (client) => {
  // Retrieve work positions index model
  const workPositionsIndex = await client.itemType.find("work_positions_index");

  // Retrieve internal link model
  const internalLinkModel = await client.itemType.find("link_internal");

  await client.fields.create(workPositionsIndex.id, {
    label: "Links aggiuntivi per l'header della pagina",
    apiKey: "header_links",
    fieldType: "links",
    position: 4,
    validators: {
      size: {
        max: 8,
      },
      itemsItemType: {
        item_types: [internalLinkModel.id],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });
};

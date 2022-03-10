"use strict";

module.exports = async (client) => {
  // Retrieve blocks that need the new field
  const pnrrBlock = await client.itemType.find("block_pnrr");
  const italy2026Block = await client.itemType.find("block_italy2026");

  // Create field in PNRR block
  const stickyNavField = await client.fields.create(pnrrBlock.id, {
    label: "Titolo di sezione nel menù di navigazione",
    apiKey: "menu_title",
    fieldType: "string",
    position: 1,
    validators: {
      required: {},
      length: {
        max: 40,
      },
    },
    appearance: {
      editor: "single_line",
      parameters: {
        heading: false,
      },
      addons: [],
    },
  });

  // Create field in Italy2026 block
  const stickyMenuField = await client.fields.create(italy2026Block.id, {
    label: "Titolo di sezione nel menù di navigazione",
    apiKey: "menu_title",
    fieldType: "string",
    position: 1,
    validators: {
      required: {},
      length: {
        max: 40,
      },
    },
    appearance: {
      editor: "single_line",
      parameters: {
        heading: false,
      },
      addons: [],
    },
  });
};

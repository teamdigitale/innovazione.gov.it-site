"use strict";

module.exports = async (client) => {
  // Retrieve blocks that need the new field
  const pnrrBlock = await client.itemType.find("block_pnrr");
  const italy2026Block = await client.itemType.find("block_italy2026");

  // Create field in PNRR block
  await client.fields.create(pnrrBlock.id, {
    label: "Titolo di sezione nel menù di navigazione (se presente)",
    apiKey: "menu_title",
    fieldType: "string",
    defaultValue: "Il PNRR",
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
  await client.fields.create(italy2026Block.id, {
    label: "Titolo di sezione nel menù di navigazione (se presente)",
    apiKey: "menu_title",
    fieldType: "string",
    defaultValue: "Gli obiettivi",
    position: 1,
    validators: {
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

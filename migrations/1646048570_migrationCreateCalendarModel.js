"use strict";

module.exports = async (client) => {
  // Create model
  const calendar = await client.itemTypes.create({
    name: "Cronoprogramma",
    apiKey: "calendar",
  });

  // Add title
  await client.fields.create(calendar.id, {
    label: "Titolo",
    apiKey: "title",
    fieldType: "string",
    validators: {
      required: {},
      length: {
        max: 80,
      },
    },
    appearance: {
      editor: "single_line",
      parameters: {
        heading: true,
      },
      addons: [],
    },
  });

  // Add phases
  const phaseBlock = await client.itemType.find("block_phase");

  await client.fields.create(calendar.id, {
    label: "Fasi",
    apiKey: "phases",
    fieldType: "rich_text",
    validators: {
      size: {
        max: 3,
      },
      richTextBlocks: {
        itemTypes: [phaseBlock.id],
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

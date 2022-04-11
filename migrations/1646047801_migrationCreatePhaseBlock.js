"use strict";

module.exports = async (client) => {
  // Create new block
  const phaseBlock = await client.itemTypes.create({
    name: "Fase",
    apiKey: "block_phase",
    modularBlock: true,
  });

  // Add title
  await client.fields.create(phaseBlock.id, {
    label: "Titolo",
    apiKey: "title",
    fieldType: "string",
    validators: {
      required: {},
      length: {
        max: 42,
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

  // Add state, with 3 pre-determined options
  await client.fields.create(phaseBlock.id, {
    label: "Stato",
    apiKey: "state",
    fieldType: "string",
    validators: {
      required: {},
      enum: {
        values: ["past", "current", "future"],
      },
    },
    appearance: {
      editor: "string_radio_group",
      parameters: {
        radios: [
          { label: "Passato", value: "past" },
          { label: "In corso", value: "current" },
          { label: "Futuro", value: "future" },
        ],
      },
      addons: [],
    },
  });

  // Add milestones field
  const milestoneBlock = await client.itemType.find("block_milestone");

  await client.fields.create(phaseBlock.id, {
    label: "Milestones",
    apiKey: "milestones",
    fieldType: "rich_text",
    validators: {
      size: {
        max: 6,
      },
      richTextBlocks: {
        itemTypes: [milestoneBlock.id],
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

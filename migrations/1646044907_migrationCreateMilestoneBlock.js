"use strict";

module.exports = async (client) => {
  // Create new block
  const milestoneBlock = await client.itemTypes.create({
    name: "Milestone",
    apiKey: "block_milestone",
    modularBlock: true,
  });

  // Add title
  await client.fields.create(milestoneBlock.id, {
    label: "Periodo",
    apiKey: "timeframe",
    fieldType: "string",
    hint: "Esempio: I semestre 2022",
    validators: {
      required: {},
      length: {
        max: 60,
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
  await client.fields.create(milestoneBlock.id, {
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

  // Add subtitle
  await client.fields.create(milestoneBlock.id, {
    label: "Descrizione",
    apiKey: "subtitle",
    fieldType: "string",
    validators: {
      required: {},
      length: {
        max: 120,
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

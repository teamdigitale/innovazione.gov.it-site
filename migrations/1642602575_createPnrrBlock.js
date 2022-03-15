"use strict";

module.exports = async (client) => {
  // Create new block
  const pnrrBlock = await client.itemTypes.create({
    name: "Blocco PNRR",
    apiKey: "block_pnrr",
    modularBlock: true,
  });

  // Add pre-title field
  await client.fields.create(pnrrBlock.id, {
    label: "Pre titolo",
    apiKey: "pre_title",
    fieldType: "string",
    validators: {
      required: {},
      length: {
        max: 60,
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

  // Add title
  await client.fields.create(pnrrBlock.id, {
    label: "Titolo",
    apiKey: "title",
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
        heading: true,
      },
      addons: [],
    },
  });

  // Add text (description)
  await client.fields.create(pnrrBlock.id, {
    label: "Testo",
    apiKey: "text",
    fieldType: "text",
    validators: {
      required: {},
      length: {
        max: 240,
      },
    },
    appearance: {
      editor: "textarea",
      parameters: {},
      addons: [],
    },
  });

  // Find number element model
  const numberModel = await client.itemType.find("number_element");

  // Add numbers
  await client.fields.create(pnrrBlock.id, {
    label: "Numeri",
    apiKey: "numbers",
    fieldType: "links",
    validators: {
      size: {
        max: 2,
      },
      itemsItemType: {
        item_types: [numberModel.id],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });
};

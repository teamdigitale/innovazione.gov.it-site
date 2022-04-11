"use strict";

module.exports = async (client) => {
  // Create intervention axis block
  const interventionBlock = await client.itemTypes.create({
    name: "Blocco intervento",
    apiKey: "intervention_block",
    modularBlock: true,
  });

  // Add title
  await client.fields.create(interventionBlock.id, {
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

  // Add description
  await client.fields.create(interventionBlock.id, {
    label: "Descrizione",
    apiKey: "description",
    fieldType: "string",
    validators: {
      required: {},
      length: {
        max: 180,
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

  // Add image
  await client.fields.create(interventionBlock.id, {
    label: "Thumbnail",
    apiKey: "thumbnail",
    fieldType: "file",
    validators: {
      required: {},
      file_size: {
        max_value: 1,
        max_unit: "MB",
      },
      extension: {
        predefined_list: "image",
      },
      required_alt_title: {
        alt: true,
        title: false,
      },
    },
    appearance: {
      editor: "file",
      parameters: {},
      addons: [],
    },
  });
};

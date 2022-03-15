"use strict";

module.exports = async (client) => {
  const ministerBlock = await client.itemTypes.create({
    name: "Blocco Ministro",
    apiKey: "block_minister",
    modularBlock: true,
  });

  await client.fields.create(ministerBlock.id, {
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

  await client.fields.create(ministerBlock.id, {
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

  await client.fields.create(ministerBlock.id, {
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

  const interviewModel = await client.itemType.find("interview");

  await client.fields.create(ministerBlock.id, {
    label: "Interviste",
    apiKey: "featured_interviews",
    fieldType: "links",
    validators: {
      size: {
        max: 3,
      },
      itemsItemType: {
        item_types: [interviewModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });
};

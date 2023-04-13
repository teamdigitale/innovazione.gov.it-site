"use strict";

module.exports = async (client) => {
  const Italia2026Block = await client.itemTypes.create({
    name: "Italia 2026",
    apiKey: "block_italy2026",
    modularBlock: true,
  });

  const percentModel = await client.itemType.find("percent_element");
  const linkInternalModel = await client.itemType.find("link_internal");

  await client.fields.create(Italia2026Block.id, {
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

  await client.fields.create(Italia2026Block.id, {
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

  await client.fields.create(Italia2026Block.id, {
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

  await client.fields.create(Italia2026Block.id, {
    label: "Thumbnail",
    apiKey: "thumbnail",
    fieldType: "file",
    validators: {
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

  await client.fields.create(Italia2026Block.id, {
    label: "Link",
    apiKey: "link",
    fieldType: "link",
    validators: {
      itemItemType: {
        itemTypes: [linkInternalModel.id],
      },
    },
    appearance: {
      editor: "link_select",
      parameters: {},
      addons: [],
    },
  });

  await client.fields.create(Italia2026Block.id, {
    label: "Numero percentuale",
    apiKey: "percent_numbers",
    fieldType: "links",
    validators: {
      size: {
        max: 6,
      },
      itemsItemType: {
        item_types: [percentModel.id],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });
};

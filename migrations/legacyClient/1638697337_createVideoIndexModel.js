"use strict";

module.exports = async (client) => {
  const videoIndexModel = await client.itemTypes.create({
    name: "Indice Video",
    apiKey: "videos_index",
    singleton: true,
  });

  const titleField = await client.fields.create(videoIndexModel.id, {
    label: "Titolo",
    apiKey: "title",
    fieldType: "string",
    position: 1,
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

  const videoModel = await client.itemType.find("video");

  await client.fields.create(videoIndexModel.id, {
    label: "Video in evidenza",
    apiKey: "featured_videos",
    fieldType: "links",
    position: 2,
    validators: {
      size: {
        max: 3,
      },
      itemsItemType: {
        item_types: [videoModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });

  const menuLabelField = await client.fields.create(videoIndexModel.id, {
    label: "Menu label",
    apiKey: "menu_label",
    fieldType: "string",
    position: 3,
    validators: {
      required: {},
      length: {
        max: 24,
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

  await client.fields.create(videoIndexModel.id, {
    label: "Slug",
    apiKey: "slug",
    fieldType: "slug",
    position: 4,
    validators: {
      slugTitleField: {
        titleFieldId: menuLabelField.id,
      },
      required: {},
      unique: {},
      slugFormat: {
        predefinedPattern: "webpage_slug",
      },
    },
    appearance: {
      editor: "slug",
      parameters: {},
      addons: [],
    },
  });

  await client.fields.create(videoIndexModel.id, {
    label: "SEO",
    apiKey: "seo",
    fieldType: "seo",
    position: 5,
    validators: {
      titleLength: {
        max: 60,
      },
      descriptionLength: {
        max: 160,
      },
    },
    appearance: {
      editor: "seo",
      parameters: {},
      addons: [],
    },
  });

  await client.items.create({
    itemType: videoIndexModel.id,
    title: "Video",
    menuLabel: "video",
    slug: "video",
  });
};

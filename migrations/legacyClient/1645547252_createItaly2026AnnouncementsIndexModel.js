"use strict";

module.exports = async (client) => {
  // Create model
  const italy2026AnnouncementsIndex = await client.itemTypes.create({
    name: "Indice Avvisi Pubblici Italia 2026",
    apiKey: "italy2026_announcements_index",
    draftModeActive: true,
    singleton: true,
  });

  // Create title field
  await client.fields.create(italy2026AnnouncementsIndex.id, {
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

  // Create menu label and slug field
  const menuLabel = await client.fields.create(italy2026AnnouncementsIndex.id, {
    label: "Menu label",
    apiKey: "menu_label",
    fieldType: "string",
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

  await client.fields.create(italy2026AnnouncementsIndex.id, {
    label: "Slug",
    apiKey: "slug",
    fieldType: "slug",
    validators: {
      slugTitleField: {
        titleFieldId: menuLabel.id,
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

  // Create SEO field
  await client.fields.create(italy2026AnnouncementsIndex.id, {
    label: "SEO",
    apiKey: "seo",
    fieldType: "seo",
    validators: {
      requiredSeoFields: {
        title: true,
        description: true,
        image: false,
        twitterCard: false,
      },
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
};

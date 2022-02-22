"use strict";

module.exports = async (client) => {
  // Create model
  const italy2026AnnouncementsIndex = await client.itemTypes.create({
    name: "Indice Avvisi Pubblici Italia 2026",
    apiKey: "italy2026_announcements_index",
    draftModeActive: true,
    singleton: true,
  });

  const title = await client.fields.create(italy2026AnnouncementsIndex.id, {
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

  const slug = await client.fields.create(italy2026AnnouncementsIndex.id, {
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

  const seoMetatagsField = await client.fields.create(
    italy2026AnnouncementsIndex.id,
    {
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
    }
  );
};

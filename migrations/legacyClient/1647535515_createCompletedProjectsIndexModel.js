"use strict";

module.exports = async (client) => {
  const completedProjectsIndex = await client.itemTypes.create({
    name: "Progetti conclusi",
    apiKey: "completed_projects_index",
    draftModeActive: true,
    singleton: true,
  });

  await client.fields.create(completedProjectsIndex.id, {
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

  await client.fields.create(completedProjectsIndex.id, {
    label: "Descrizione",
    apiKey: "subtitle",
    fieldType: "string",
    validators: {
      length: {
        max: 160,
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

  const menuLabel = await client.fields.create(completedProjectsIndex.id, {
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

  await client.fields.create(completedProjectsIndex.id, {
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

  await client.fields.create(completedProjectsIndex.id, {
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

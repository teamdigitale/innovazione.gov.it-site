"use strict";

module.exports = async (client) => {
  // Create model
  const italy2026Model = await client.itemTypes.create({
    name: "Italia Digitale 2026",
    apiKey: "italy2026_page",
    draftModeActive: true,
    singleton: true,
  });

  // Create header fieldset
  const headerFieldset = await client.fieldset.create(italy2026Model.id, {
    title: "Header",
    collapsible: true,
    startCollapsed: true,
  });

  // Create hero fields
  const titleField = await client.fields.create(italy2026Model.id, {
    label: "Titolo",
    apiKey: "title",
    fieldset: headerFieldset.id,
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

  await client.fields.create(italy2026Model.id, {
    label: "Sottotitolo (o descrizione)",
    apiKey: "subtitle",
    fieldset: headerFieldset.id,
    fieldType: "string",
    position: 2,
    validators: {
      required: {},
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

  await client.fields.create(italy2026Model.id, {
    label: "Immagine",
    apiKey: "image",
    fieldset: headerFieldset.id,
    fieldType: "file",
    position: 3,
    validators: {
      required: {},
      file_size: {
        max_value: 2,
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

  // Menu label and slug fields
  await client.fields.create(italy2026Model.id, {
    label: "Menu label",
    apiKey: "menu_label",
    fieldType: "string",
    position: 4,
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

  await client.fields.create(italy2026Model.id, {
    label: "Slug",
    apiKey: "slug",
    fieldType: "slug",
    position: 5,
    validators: {
      slugTitleField: {
        titleFieldId: titleField.id,
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

  // Create featured, contents and ontology fieldsets
  const featuredFieldset = await client.fieldset.create(italy2026Model.id, {
    title: "In evidenza",
    position: 6,
    collapsible: true,
    startCollapsed: true,
  });

  const contentFieldset = await client.fieldset.create(italy2026Model.id, {
    title: "Contenuti",
    position: 7,
    collapsible: true,
    startCollapsed: true,
  });

  const ontologyFieldset = await client.fieldset.create(italy2026Model.id, {
    title: "Ontologia",
    position: 8,
    collapsible: true,
    startCollapsed: true,
  });

  // SEO fieldset and field
  const seoFieldset = await client.fieldset.create(italy2026Model.id, {
    title: "SEO",
    position: 9,
    collapsible: true,
    startCollapsed: true,
  });

  await client.fields.create(italy2026Model.id, {
    label: "SEO",
    apiKey: "seo",
    fieldset: seoFieldset.id,
    fieldType: "seo",
    validators: {
      requiredSeoFields: {
        title: true,
        description: true,
        image: false,
        twitterCard: false,
      },
      titleLength: {
        max: 100,
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

  // Add tags in ontology fieldset
  const tagModel = await client.itemType.find("tag");

  await client.fields.create(italy2026Model.id, {
    label: "Argomenti",
    apiKey: "tags",
    fieldset: ontologyFieldset.id,
    fieldType: "links",
    validators: {
      size: {
        max: 4,
      },
      itemsItemType: {
        item_types: [tagModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });

  // Add fields to featured fieldset
  await client.fields.create(italy2026Model.id, {
    label: "Pre titolo",
    apiKey: "featured_pre_title",
    fieldset: featuredFieldset.id,
    fieldType: "string",
    validators: {
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

  await client.fields.create(italy2026Model.id, {
    label: "Titolo in evidenza",
    apiKey: "featured_title",
    fieldset: featuredFieldset.id,
    fieldType: "string",
    validators: {
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

  const externalLinkModel = await client.itemType.find("link_external");
  const internalLinkModel = await client.itemType.find("link_internal");

  await client.fields.create(italy2026Model.id, {
    label: "Collegamenti",
    apiKey: "featured_links",
    fieldType: "links",
    fieldset: featuredFieldset.id,
    validators: {
      itemsItemType: {
        item_types: [externalLinkModel.id, internalLinkModel.id],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });

  // Add fields to content fieldset
  // Add blocks field
  const pnrrBlock = await client.itemType.find("block_pnrr");
  const interventionAxesBlock = await client.itemType.find(
    "block_axes_intervention"
  );
  const flagBlock = await client.itemType.find("block_first_flag");
  const italy2026Block = await client.itemType.find("block_italy2026");

  await client.fields.create(italy2026Model.id, {
    label: "Blocchi",
    apiKey: "content_blocks",
    fieldset: contentFieldset.id,
    fieldType: "rich_text",
    validators: {
      richTextBlocks: {
        itemTypes: [
          pnrrBlock.id,
          interventionAxesBlock.id,
          flagBlock.id,
          italy2026Block.id,
        ],
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

  // Add featured articles field
  const articleModel = await client.itemType.find("article");

  await client.fields.create(italy2026Model.id, {
    label: "Articoli",
    apiKey: "articles",
    fieldType: "links",
    fieldset: contentFieldset.id,
    validators: {
      size: {
        max: 3,
      },
      itemsItemType: {
        item_types: [articleModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });

  // Add press releases field
  const pressReleaseModel = await client.itemType.find("press_release");

  await client.fields.create(italy2026Model.id, {
    label: "Comunicati stampa",
    apiKey: "press_releases",
    fieldType: "links",
    fieldset: contentFieldset.id,
    validators: {
      size: {
        max: 3,
      },
      itemsItemType: {
        item_types: [pressReleaseModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });

  // Add public announcements field
  const announcementModel = await client.itemType.find("announcement");

  await client.fields.create(italy2026Model.id, {
    label: "Avvisi pubblici",
    apiKey: "announcements",
    fieldType: "links",
    fieldset: contentFieldset.id,
    validators: {
      size: {
        max: 3,
      },
      itemsItemType: {
        item_types: [announcementModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });
};

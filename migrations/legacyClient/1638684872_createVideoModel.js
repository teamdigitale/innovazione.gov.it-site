"use strict";

module.exports = async (client) => {
  const videoModel = await client.itemTypes.create({
    name: "Video",
    apiKey: "video",
    draftModeActive: true,
  });

  const titleField = await client.fields.create(videoModel.id, {
    label: "Titolo",
    apiKey: "title",
    fieldType: "string",
    position: 1,
    validators: {
      required: {},
      unique: {},
      length: {
        max: 68,
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

  await client.fields.create(videoModel.id, {
    label: "Sottotitolo",
    apiKey: "subtitle",
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

  await client.fields.create(videoModel.id, {
    label: "Slug",
    apiKey: "slug",
    fieldType: "slug",
    position: 3,
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

  const contentFieldset = await client.fieldset.create(videoModel.id, {
    title: "Contenuto",
    position: 5,
    collapsible: true,
    startCollapsed: true,
  });

  const ontologyFieldset = await client.fieldset.create(videoModel.id, {
    title: "Ontologia",
    position: 6,
    collapsible: true,
    startCollapsed: true,
  });

  const metadataFieldset = await client.fieldset.create(videoModel.id, {
    title: "Metadati",
    position: 7,
    collapsible: true,
    startCollapsed: true,
  });

  const seoFieldset = await client.fieldset.create(videoModel.id, {
    title: "SEO",
    position: 8,
    collapsible: true,
    startCollapsed: true,
  });

  await client.fields.create(videoModel.id, {
    label: "video",
    apiKey: "video",
    fieldType: "video",
    fieldset: contentFieldset.id,
    validators: {
      required: {},
    },
    appearance: {
      editor: "video",
      parameters: {},
      addons: [],
    },
    hint: "Ricorda che l'inserimento di un video (da youtube) è un processo che potrebbe inficiare l'accessibilità. Chiediti sempre: è davvero necessario incorporarlo o potrei collegarlo? Se è necessario ho la trascrizione di quanto viene detto? Il video ha sottotitoli? Se non sai cosa fare parlane con i responsabili del sito web.",
  });

  await client.fields.create(videoModel.id, {
    label: "Trascrizione",
    apiKey: "transcription",
    fieldType: "text",
    fieldset: contentFieldset.id,
    validators: {
      required: {},
    },
    appearance: {
      editor: "markdown",
      parameters: {
        toolbar: [
          "heading",
          "bold",
          "italic",
          "strikethrough",
          "code",
          "unordered_list",
          "ordered_list",
          "quote",
          "link",
          "image",
          "fullscreen",
        ],
      },
      addons: [],
    },
  });

  const attachmentModel = await client.itemType.find("attachment");
  const externalLinkModel = await client.itemType.find("link_external");
  const internalLinkModel = await client.itemType.find("link_internal");
  const articleModel = await client.itemType.find("article");
  const announcementModel = await client.itemType.find("announcement");
  const pressReleaseModel = await client.itemType.find("press_release");
  const focusModel = await client.itemType.find("focus_page");
  const projectModel = await client.itemType.find("project");
  const projectsSubpageModel = await client.itemType.find("projects_subpage");
  const participationModel = await client.itemType.find("participation");
  const interviewModel = await client.itemType.find("interview");
  const generalPageModel = await client.itemType.find("general_page");
  const departmentModel = await client.itemType.find("department_page");
  const departmentSubpageModel = await client.itemType.find(
    "department_subpage"
  );
  const ministerModel = await client.itemType.find("minister_page");
  const ministerSubpageModel = await client.itemType.find("minister_subpage");
  const tagModel = await client.itemType.find("tag");
  const targetModel = await client.itemType.find("target");

  await client.fields.create(videoModel.id, {
    label: "Allegati",
    apiKey: "attachments",
    fieldType: "links",
    fieldset: contentFieldset.id,
    validators: {
      itemsItemType: {
        item_types: [attachmentModel.id],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });

  await client.fields.create(videoModel.id, {
    label: "Collegamenti",
    apiKey: "links",
    fieldType: "links",
    fieldset: contentFieldset.id,
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

  await client.fields.create(videoModel.id, {
    label: "Potrebbero interessarti",
    apiKey: "related_items",
    fieldType: "links",
    fieldset: contentFieldset.id,
    validators: {
      size: {
        max: 12,
      },
      itemsItemType: {
        item_types: [
          articleModel.id,
          announcementModel.id,
          pressReleaseModel.id,
          videoModel.id,
          focusModel.id,
          projectModel.id,
          participationModel.id,
          interviewModel.id,
          generalPageModel.id,
          departmentSubpageModel.id,
          ministerSubpageModel.id,
          projectsSubpageModel.id,
        ],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });

  await client.fields.create(videoModel.id, {
    label: "A chi appartiene",
    apiKey: "owners",
    fieldType: "links",
    fieldset: ontologyFieldset.id,
    validators: {
      size: {
        min: 1,
      },
      itemsItemType: {
        item_types: [departmentModel.id, ministerModel.id],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });

  const tagsField = await client.fields.create(videoModel.id, {
    label: "Argomenti",
    apiKey: "tags",
    fieldType: "links",
    fieldset: ontologyFieldset.id,
    validators: {
      size: {
        min: 1,
        max: 4,
      },
      itemsItemType: {
        item_types: [tagModel.id],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });

  await client.fields.create(videoModel.id, {
    label: "Targets",
    apiKey: "targets",
    fieldType: "links",
    fieldset: ontologyFieldset.id,
    validators: {
      size: {
        min: 1,
      },
      itemsItemType: {
        item_types: [targetModel.id],
      },
    },
    appearance: {
      editor: "links_select",
      parameters: {},
      addons: [],
    },
  });

  await client.fields.create(videoModel.id, {
    label: "Data da mostrare",
    apiKey: "date_shown",
    fieldType: "date_time",
    fieldset: metadataFieldset.id,
    hint: "Attenzione: questa è la data che viene usata per l'ordinamento cronologico negli elenchi del sito",
    validators: {
      required: {},
    },
    appearance: {
      editor: "date_time_picker",
      parameters: {},
      addons: [],
    },
  });

  await client.fields.create(videoModel.id, {
    label: "Durata video",
    apiKey: "time",
    fieldType: "integer",
    fieldset: metadataFieldset.id,
    validators: {},
    appearance: {
      editor: "integer",
      parameters: {},
      addons: [],
    },
  });

  await client.fields.create(videoModel.id, {
    label: "SEO",
    apiKey: "seo",
    fieldType: "seo",
    fieldset: seoFieldset.id,
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
};

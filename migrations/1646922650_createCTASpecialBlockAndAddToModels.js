"use strict";

module.exports = async (client) => {
  // Create new block
  const ctaSpecialBlock = await client.itemTypes.create({
    name: "CTA speciale",
    apiKey: "block_cta_special",
    modularBlock: true,
  });

  // Add title
  await client.fields.create(ctaSpecialBlock.id, {
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
  await client.fields.create(ctaSpecialBlock.id, {
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
  await client.fields.create(ctaSpecialBlock.id, {
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

  // Add checkbox for light or dark background
  await client.fields.create(ctaSpecialBlock.id, {
    label: "Sfondo",
    apiKey: "background",
    fieldType: "string",
    validators: {
      required: {},
      enum: {
        values: ["dark", "light"],
      },
    },
    appearance: {
      editor: "string_radio_group",
      parameters: {
        radios: [
          { label: "Chiaro", value: "light" },
          { label: "Scuro", value: "dark" },
        ],
      },
      addons: [],
    },
  });

  const externalLinkModel = await client.itemType.find("link_external");
  const internalLinkModel = await client.itemType.find("link_internal");

  await client.fields.create(ctaSpecialBlock.id, {
    label: "Link",
    apiKey: "link",
    fieldType: "link",
    validators: {
      required: {},
      itemItemType: {
        itemTypes: [externalLinkModel.id, internalLinkModel.id],
      },
    },
    appearance: {
      editor: "link_select",
      parameters: {},
      addons: [],
    },
  });

  // ==================================================================================
  // Now we will add this block as a valid option to content_blocks in all editorial models

  // Article model
  const articleContentsField = await client.field.find(
    "article::content_blocks"
  );
  const articleValidBlocks =
    articleContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(articleContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...articleValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Articolo e scheda super generatore (ctype_super_copy1)
  const superCopyContentsField = await client.field.find(
    "ctype_super_copy1::content_blocks"
  );
  const superCopyValidBlocks =
    superCopyContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(superCopyContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...superCopyValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Avviso pubblico
  const announcementContentsField = await client.field.find(
    "announcement::content_blocks"
  );
  const announcementValidBlocks =
    announcementContentsField.validators.richTextBlocks.itemTypes;
  //const ctaBlock = await client.itemType.find("block_cta");

  client.field.update(announcementContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...announcementValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Communicato stampa
  const pressReleaseContentsField = await client.field.find(
    "press_release::content_blocks"
  );
  const pressReleaseValidBlocks =
    pressReleaseContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(pressReleaseContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...pressReleaseValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Evento agenda
  const scheduleEventContentsField = await client.field.find(
    "schedule_event::content_blocks"
  );
  const scheduleEventValidBlocks =
    scheduleEventContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(scheduleEventContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...scheduleEventValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Focus
  const focusContentsField = await client.field.find(
    "focus_page::content_blocks"
  );
  const focusValidBlocks =
    focusContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(focusContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...focusValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Intervento
  const participationContentsField = await client.field.find(
    "participation::content_blocks"
  );
  const participationValidBlocks =
    participationContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(participationContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...participationValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Intervista
  const interviewContentsField = await client.field.find(
    "interview::content_blocks"
  );
  const interviewValidBlocks =
    interviewContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(interviewContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...interviewValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Progetto
  const projectContentsField = await client.field.find(
    "project::content_blocks"
  );
  const projectValidBlocks =
    projectContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(projectContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...projectValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Scheda dipartimento
  const deptSubpageContentsField = await client.field.find(
    "department_subpage::content_blocks"
  );
  const deptSubpageValidBlocks =
    deptSubpageContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(deptSubpageContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...deptSubpageValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Scheda generica
  const generalPageContentsField = await client.field.find(
    "general_page::content_blocks"
  );
  const generalPageValidBlocks =
    generalPageContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(generalPageContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...generalPageValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Scheda ministro
  const minSubpageContentsField = await client.field.find(
    "minister_subpage::content_blocks"
  );
  const minSubpageValidBlocks =
    minSubpageContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(minSubpageContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...minSubpageValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Scheda notizie
  const newsSubpageContentsField = await client.field.find(
    "news_subpage::content_blocks"
  );
  const newsSubpageValidBlocks =
    newsSubpageContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(newsSubpageContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...newsSubpageValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Scheda progetti
  const projectsSubpageContentsField = await client.field.find(
    "projects_subpage::content_blocks"
  );
  const projectsSubpageValidBlocks =
    projectsSubpageContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(projectsSubpageContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...projectsSubpageValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Posizione lavorativa
  const jobPositionContentsField = await client.field.find(
    "job_position::content_blocks"
  );
  const jobPositionValidBlocks =
    jobPositionContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(jobPositionContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...jobPositionValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Posizione lavorativa PNRR
  const pnrrJobPositionContentsField = await client.field.find(
    "pnrr_job_position::content_blocks"
  );
  const pnrrJobPositionValidBlocks =
    pnrrJobPositionContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(pnrrJobPositionContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...pnrrJobPositionValidBlocks, ctaSpecialBlock.id],
      },
    },
  });

  // Scheda Italia 2026
  const italy2026ContentsField = await client.field.find(
    "italy2026_subpage::content_blocks"
  );
  const italy2026SubpageValidBlocks =
    italy2026ContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(italy2026ContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...italy2026SubpageValidBlocks, ctaSpecialBlock.id],
      },
    },
  });
};

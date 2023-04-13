"use strict";

module.exports = async (client) => {
  // Create new video block
  const videoBlock = await client.itemTypes.create({
    name: "VIDEO",
    apiKey: "block_video_content",
    modularBlock: true,
  });

  const videoModel = await client.itemType.find("video");

  await client.fields.create(videoBlock.id, {
    label: "Video",
    apiKey: "video",
    fieldType: "links",
    validators: {
      size: {
        eq: 1,
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

  await client.fields.create(videoBlock.id, {
    label: "Grande?",
    apiKey: "big",
    fieldType: "boolean",
    validators: {},
    appearance: {
      editor: "boolean",
      parameters: {},
      addons: [],
    },
  });

  // Article model
  const articleContentsField = await client.field.find(
    "article::content_blocks"
  );
  const articleValidBlocks =
    articleContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(articleContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...articleValidBlocks, videoBlock.id],
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
        itemTypes: [...superCopyValidBlocks, videoBlock.id],
      },
    },
  });

  // Avviso pubblico
  const announcementContentsField = await client.field.find(
    "announcement::content_blocks"
  );
  const announcementValidBlocks =
    announcementContentsField.validators.richTextBlocks.itemTypes;

  client.field.update(announcementContentsField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...announcementValidBlocks, videoBlock.id],
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
        itemTypes: [...pressReleaseValidBlocks, videoBlock.id],
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
        itemTypes: [...scheduleEventValidBlocks, videoBlock.id],
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
        itemTypes: [...focusValidBlocks, videoBlock.id],
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
        itemTypes: [...participationValidBlocks, videoBlock.id],
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
        itemTypes: [...interviewValidBlocks, videoBlock.id],
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
        itemTypes: [...projectValidBlocks, videoBlock.id],
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
        itemTypes: [...deptSubpageValidBlocks, videoBlock.id],
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
        itemTypes: [...generalPageValidBlocks, videoBlock.id],
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
        itemTypes: [...minSubpageValidBlocks, videoBlock.id],
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
        itemTypes: [...newsSubpageValidBlocks, videoBlock.id],
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
        itemTypes: [...projectsSubpageValidBlocks, videoBlock.id],
      },
    },
  });
};

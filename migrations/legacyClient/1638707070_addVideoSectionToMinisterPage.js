"use strict";

module.exports = async (client) => {
  const ministerModel = await client.itemType.find("minister_page");
  const videoModel = await client.itemType.find("video");

  const ministerFieldsets = await client.fieldsets.all("minister_page");

  const contentFieldset = ministerFieldsets.find(
    (fieldset) => fieldset.title === "Contenuti"
  );

  await client.fields.create(ministerModel.id, {
    label: "Titolo sezione video",
    apiKey: "video_section_title",
    fieldType: "string",
    fieldset: contentFieldset.id,
    validators: {},
    appearance: {
      editor: "single_line",
      parameters: {
        heading: false,
      },
      addons: [],
    },
  });

  await client.fields.create(ministerModel.id, {
    label: "Sezione video",
    apiKey: "video_section",
    fieldType: "links",
    fieldset: contentFieldset.id,
    validators: {
      size: {
        max: 2,
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
};

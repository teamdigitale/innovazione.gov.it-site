"use strict";

module.exports = async (client) => {
  const homepageModel = await client.itemType.find("homepage");
  const videoModel = await client.itemType.find("video");

  const videoFieldset = await client.fieldset.create(homepageModel.id, {
    title: "Videos",
    position: 9,
    collapsible: true,
    startCollapsed: true,
  });

  await client.fields.create(homepageModel.id, {
    label: "Sezione video",
    apiKey: "video_section",
    fieldType: "links",
    fieldset: videoFieldset.id,
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

"use strict";

module.exports = async (client) => {
  // Find field that needs to be updated
  const featuredField = await client.field.find(
    "block_minister::featured_interviews"
  );

  // Valid item types for minister block before migration
  const validItemTypes = featuredField.validators.itemsItemType.itemTypes;

  // Model that will be added to valid item types for minister block
  const videoModel = await client.itemType.find("video");

  // Update function
  await client.field.update(featuredField.id, {
    label: "In evidenza Ministro",
    apiKey: "minister_featured_news",
    validators: {
      itemsItemType: {
        itemTypes: [...validItemTypes, videoModel.id],
      },
    },
  });
};

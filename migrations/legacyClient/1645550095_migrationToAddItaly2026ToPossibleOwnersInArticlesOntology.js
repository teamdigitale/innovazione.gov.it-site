"use strict";

module.exports = async (client) => {
  // Find field that needs to be updated
  const ownersField = await client.field.find("article::owners");

  // Valid item types before migration
  const validItemTypes = ownersField.validators.itemsItemType.itemTypes;

  // Model that will be added to valid item types for minister block
  const italy2026Model = await client.itemType.find("italy2026_page");

  // Update function
  await client.field.update(ownersField.id, {
    label: "A chi appartiene",
    apiKey: "owners",
    validators: {
      itemsItemType: {
        itemTypes: [...validItemTypes, italy2026Model.id],
      },
    },
  });
};

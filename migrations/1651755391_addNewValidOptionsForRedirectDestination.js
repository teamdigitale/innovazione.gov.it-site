"use strict";

module.exports = async (client) => {
  // Find field to modify
  const linkField = await client.field.find("resource_redirect::link");

  // Models to add as valid options
  const innovatePage = await client.itemType.find("innovate_page");
  const innovateSubpage = await client.itemType.find("innovate_subpage");
  const workPosition = await client.itemType.find("work_position");
  const workPositionsIndex = await client.itemType.find("work_positions_index");

  // Current valid item types
  const validItemTypes = linkField.validators.itemItemType.itemTypes;

  client.field.update(linkField.id, {
    validators: {
      required: {},
      itemItemType: {
        itemTypes: [
          ...validItemTypes,
          innovatePage.id,
          innovateSubpage.id,
          workPosition.id,
          workPositionsIndex.id,
        ],
      },
    },
  });
};

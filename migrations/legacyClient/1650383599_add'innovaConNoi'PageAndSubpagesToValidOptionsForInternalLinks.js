"use strict";

module.exports = async (client) => {
  const linkField = await client.field.find("link_internal::link");
  const innovatePage = await client.itemType.find("innovate_page");
  const innovateSubpage = await client.itemType.find("innovate_subpage");
  const jobPosition = await client.itemType.find("work_position");
  const jobPositionsIndex = await client.itemType.find("work_positions_index");

  const validItemTypes = linkField.validators.itemItemType.itemTypes;

  client.field.update(linkField.id, {
    validators: {
      required: {},
      itemItemType: {
        itemTypes: [
          ...validItemTypes,
          innovatePage.id,
          innovateSubpage.id,
          jobPosition.id,
          jobPositionsIndex.id,
        ],
      },
    },
  });
};

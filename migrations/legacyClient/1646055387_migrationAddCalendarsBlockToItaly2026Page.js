"use strict";

module.exports = async (client) => {
  const calendarBlock = await client.itemType.find("block_calendar");
  const italy2026BlocksField = await client.field.find(
    "italy2026_page::content_blocks"
  );
  const validBlockTypes =
    italy2026BlocksField.validators.richTextBlocks.itemTypes;

  client.field.update(italy2026BlocksField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...validBlockTypes, calendarBlock.id],
      },
    },
  });
};

'use strict';

module.exports = async (client) => {
  const flagBlock = await client.itemType.find('block_first_flag');
  const homepageBlockField = await client.field.find('homepage::content_blocks');
  const validBlockTypes = homepageBlockField.validators.richTextBlocks.itemTypes

  client.field.update(homepageBlockField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...validBlockTypes, flagBlock.id]
      }
    }
  });
}

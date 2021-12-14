'use strict';

module.exports = async (client) => {
  const flagBlock = await client.itemType.find('block_first_flag');
  const homepageBlocksField = await client.field.find('homepage::content_blocks');
  const validBlockTypes = homepaageBlocksField.validators.itemsItemType.itemTypes

  client.field.update(homepageModel.id, {
    validators: {
      itemsItemType: {
        itemTypes: [...validBlockTypes, flagBlock.id]
      }
    }
  });
}

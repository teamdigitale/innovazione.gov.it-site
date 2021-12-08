'use strict';

module.exports = async (client) => {
  const linkField = await client.field.find('link_internal::link');
  const videoModel = await client.itemType.find('video');
  const validItemTypes = linkField.validators.itemItemType.itemTypes

  client.field.update(linkField.id, {
    validators: {
      required: {},
      itemItemType: {
        itemTypes: [...validItemTypes, videoModel.id]
      }
    }
  })
}

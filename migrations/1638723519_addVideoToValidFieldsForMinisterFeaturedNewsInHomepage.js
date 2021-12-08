'use strict';

module.exports = async (client) => {
  const ministerFeaturedNewsField = await client.field.find('homepage::minister_featured_news');
  const videoModel = await client.itemType.find('video');
  const validItemTypes = ministerFeaturedNewsField.validators.itemsItemType.itemTypes

  client.field.update(ministerFeaturedNewsField.id, {
    validators: {
      itemsItemType: {
        itemTypes: [...validItemTypes, videoModel.id]
      }
    }
  })
}

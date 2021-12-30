'use strict';

module.exports = async (client) => {
  const videoBlock = await client.itemTypes.create({
    name: 'Blocco Video',
    apiKey: 'block_video',
    modularBlock: true,
  });


  const videoModel = await client.itemType.find('video');

  const videoField = await client.fields.create(videoBlock.id, {
    label: 'Video',
    apiKey: 'videos',
    fieldType: 'links',
    validators: {
      size: {
        min: 1,
        max: 2
      },
      itemsItemType: {
        item_types: [
          videoModel.id
        ]
      }
    },
    appearance: {
      editor: 'links_embed',
      parameters: {},
      addons: [],
    },
  });

  const homepageBlockField = await client.field.find('homepage::content_blocks');
  const validBlockTypes = homepageBlockField.validators.richTextBlocks.itemTypes

  client.field.update(homepageBlockField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...validBlockTypes, videoBlock.id]
      }
    }
  });
}

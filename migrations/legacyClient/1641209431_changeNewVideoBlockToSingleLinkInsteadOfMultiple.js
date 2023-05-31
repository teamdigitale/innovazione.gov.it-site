'use strict';

module.exports = async (client) => {
  const videoLinksField = await client.field.find('block_video_content::video');
  const videoModel = await client.itemType.find('video');

  client.field.update(videoLinksField.id, {
    fieldType: 'link',
    validators: {
      itemItemType: {
        item_types: [
          videoModel.id
        ]
      },
    },
    appearance: {
      editor: 'link_embed',
      parameters: {},
      addons: [],
    },
  });
}

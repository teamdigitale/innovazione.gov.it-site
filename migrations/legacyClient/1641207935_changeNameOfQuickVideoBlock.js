'use strict';

module.exports = async (client) => {
  const quickVideoBlock = await client.itemType.find('block_video_single');

  client.itemType.update(quickVideoBlock.id, {
    name: 'VIDEO VELOCE',
    apiKey: 'block_video_single',
    modularBlock: true,
  });
}

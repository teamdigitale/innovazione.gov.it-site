'use strict';

const { buildModularBlock } = require("datocms-client");

module.exports = async (client) => {
  // Retrieve homepage record
  const homepageContents = await client.items.all({
    filter: {
      type: "homepage"
    }
  });
  const homepageContent = homepageContents[0]
  const homepageRecordId = homepageContent.id;

  // Retrieve existing records in homepage content blocks
  const contentBlocks = homepageContent.contentBlocks;

  // Old content for video section, which we will migrate
  // to a new content block in homepage
  const videoSection = homepageContent.videoSection

  // New video block
  const videoBlock = await client.itemType.find('block_video');

  const addHomepageBlock = await client.items
    .update(homepageRecordId, {
      contentBlocks: [
        ...contentBlocks,
        buildModularBlock({
          itemType: videoBlock.id,
          videos: videoSection,
        })
      ],
  });
}

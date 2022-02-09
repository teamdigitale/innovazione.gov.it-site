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

  if (Array.isArray(videoSection) && videoSection.length) {
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
    console.log(addHomepageBlock);
  } else {
    console.log("No video section content to migrate!");
  }
}

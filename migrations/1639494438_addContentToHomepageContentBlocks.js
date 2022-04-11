"use strict";
const { buildModularBlock } = require("datocms-client");

module.exports = async (client) => {
  // Retrieve homepage record
  const homepageContents = await client.items.all({
    filter: {
      type: "homepage",
    },
  });
  const homepageContent = homepageContents[0];
  const homepageRecordId = homepageContent.id;

  // New blocks
  const focusBlock = await client.itemType.find("block_focus_highlight");
  const italy2026Block = await client.itemType.find("block_italy2026");
  const ministerBlock = await client.itemType.find("block_minister");
  const flagBlock = await client.itemType.find("block_first_flag");

  // Old content for minister block
  const ministerPreTitle = homepageContent.ministerPreTitle;
  const ministerTitle = homepageContent.ministerTitle;
  const ministerText = homepageContent.ministerText;
  const ministerFeaturedNews = homepageContent.ministerFeaturedNews;

  // Old content for Italy 2024 block
  const italy2026PreTitle = homepageContent.italy2026PreTitle;
  const italy2026Title = homepageContent.italy2026Title;
  const italy2026Text = homepageContent.italy2026Text;
  const italy2026Thumbnail = homepageContent.italy2026Thumbnail;
  const italy2026Link = homepageContent.italy2026Link;
  const italy2026PercentNumbers = homepageContent.italy2026PercentNumbers;

  //Old content for focus block
  const focusElements = homepageContent.focusElements;

  // Old content for flag Blocks
  const oldBlockFirstFlag = homepageContent.blockFirstFlags;
  const oldBlockFirstFlagId = oldBlockFirstFlag[0];
  const nestedRecord = await client.item.find(oldBlockFirstFlagId);
  const firstFlagPreTitle = nestedRecord.preTitle;
  const firstFlagTitle = nestedRecord.title;
  const firstFlagImage = nestedRecord.image;
  const firstFlagLink = nestedRecord.link;

  await client.items.update(homepageRecordId, {
    contentBlocks: [
      buildModularBlock({
        itemType: italy2026Block.id,
        preTitle: italy2026PreTitle,
        title: italy2026Title,
        text: italy2026Text,
        thumbnail: italy2026Thumbnail,
        link: italy2026Link,
        percentNumbers: italy2026PercentNumbers,
      }),
      buildModularBlock({
        title: nestedRecord.title,
        itemType: flagBlock.id,
        preTitle: nestedRecord.preTitle,
        image: nestedRecord.image,
        link: nestedRecord.link,
      }),
      buildModularBlock({
        itemType: ministerBlock.id,
        preTitle: ministerPreTitle,
        title: ministerTitle,
        text: ministerText,
        featuredInterviews: ministerFeaturedNews,
      }),
      buildModularBlock({
        itemType: focusBlock.id,
        focusElements: focusElements,
      }),
    ],
  });
};

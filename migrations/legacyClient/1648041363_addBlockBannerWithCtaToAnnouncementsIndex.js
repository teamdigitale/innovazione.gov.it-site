"use strict";

module.exports = async (client) => {
  // Find announcements index model
  const announcementsIndex = await client.itemType.find("announcements_index");

  // Find banner with cta block
  const bannerWithCta = await client.itemType.find("block_banner_with_cta");

  // Add block to index model
  await client.fields.create(announcementsIndex.id, {
    label: "Banner con CTA",
    apiKey: "banner_block",
    position: 3,
    fieldType: "rich_text",
    validators: {
      size: {
        eq: 1,
      },
      richTextBlocks: {
        itemTypes: [bannerWithCta.id],
      },
    },
    appearance: {
      editor: "rich_text",
      parameters: {
        start_collapsed: true,
      },
      addons: [],
    },
  });
};

"use strict";
const { buildModularBlock } = require("datocms-client");

module.exports = async (client) => {
  // Retrieve italy 2026 record
  const italy2026Record = await client.items.all({
    filter: {
      type: "italy2026_page",
    },
    version: "current",
  });
  const italy2026Content = italy2026Record[0];
  const italy2026RecordId = italy2026Content.id;

  // Retrieve existing records in Italy 2026 content blocks
  const contentBlocks = italy2026Content.contentBlocks;

  // Retrieve Italy2026 block from homepage content blocks
  const italyBlockRecords = await client.items.all({
    filter: {
      type: "block_italy2026",
    },
  });

  const blockRecord = italyBlockRecords[0];

  // Retrieve Italy2026 block type
  const italy2026Block = await client.itemType.find("block_italy2026");

  // Find internal link record to 'Gli obiettivi'
  const linkInternalRecords = await client.items.all({
    filter: {
      type: "link_internal",
      fields: {
        title: { eq: "Gli obiettivi" },
      },
    },
  });

  const gliObiettivi = linkInternalRecords[0];

  if (Array.isArray(italyBlockRecords) && italyBlockRecords.length) {
    await client.items.update(italy2026RecordId, {
      contentBlocks: [
        ...contentBlocks,
        buildModularBlock({
          itemType: italy2026Block.id,
          preTitle: blockRecord.preTitle,
          title: blockRecord.title,
          menuTitle: "Gli obiettivi",
          text: blockRecord.text,
          thumbnail: blockRecord.thumbnail,
          link: gliObiettivi.id,
          percentNumbers: blockRecord.percentNumbers,
        }),
      ],
    });
  } else {
    console.log("No block found to migrate!");
  }
};

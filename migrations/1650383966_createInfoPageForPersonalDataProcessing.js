"use strict";
const util = require("util");
const { buildModularBlock } = require("datocms-client");

module.exports = async (client) => {
  // Retrieve page model
  const innovateSubpage = await client.itemType.find("innovate_subpage");

  // Retrieve record to copy
  const deptSubpageRecords = await client.items.all({
    filter: {
      type: "department_subpage",
      fields: {
        title: {
          eq: "Informativa sul trattamento dei dati personali dei candidati",
        },
      },
    },
    nested: true,
  });

  const record = deptSubpageRecords[0];

  const contentBlocks = record.contentBlocks.it;

  // Remove ids from the blocks we are going to copy since we need to make copies
  const blocksWithoutId = contentBlocks.map(({ id, ...rest }) => rest);

  // Find pnrr tag record
  const filteredTags = await client.items.all({
    filter: {
      type: "tag",
      fields: {
        name: {
          eq: "Lavora con noi PNRR",
        },
      },
    },
  });

  const pnrrTag = filteredTags[0];
  const pnrrTagId = pnrrTag.id;

  // Create new subpage record
  const trattamentoDati = await client.items.create({
    itemType: innovateSubpage.id,
    title: { it: "Informativa trattamento dati" },
    subtitle: record.subtitle,
    slug: { it: "informativa-trattamento-dati" },
    summary: record.summary,
    dateShown: record.dateShown,
    imageCover: record.imageCover,
    imageCoverDescription: record.imageCoverDescription,
    contentHasIndex: record.contentHasIndex,
    contentBlocks: { it: blocksWithoutId },
    attachments: record.attachments,
    links: record.links,
    embedDashboard: record.embedDashboard,
    relatedItems: record.relatedItems,
    tags: record.tags.concat(pnrrTagId),
    targets: record.targets,
    dateShown: record.dateShown,
    seo: record.seo,
  });

  await client.item.publish(trattamentoDati.id, {
    recurisve: "false",
  });
};

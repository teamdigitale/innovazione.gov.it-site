"use strict";
const util = require("util");

function recursivelyRemoveItemIds(thing) {
  if (Array.isArray(thing)) {
    return thing.map(recursivelyRemoveItemIds);
  }

  if (typeof thing !== "object" || thing === null) {
    return thing;
  }

  if ("id" in thing && "type" in thing && thing.type === "item") {
    const { id, ...rest } = thing;
    return rest;
  }

  return Object.fromEntries(
    Object.entries(thing).map(([key, value]) => [
      key,
      recursivelyRemoveItemIds(value),
    ])
  );
}

module.exports = async (client) => {
  // Model for new records
  const workPositionModel = await client.itemType.find("work_position");

  // Fetch regular job position records
  const jobPositionRecords = await client.items.all({
    filter: {
      type: "job_position",
    },
    nested: true,
    allPages: true,
  });

  // Find 'lavora con noi' tag record
  const tags = await client.items.all({
    filter: {
      type: "tag",
      fields: {
        name: {
          eq: "Lavora con noi",
        },
      },
    },
  });

  const lavoraTag = tags[0];
  const lavoraTagId = lavoraTag.id;

  // Remove id
  const recordsToCopy = recursivelyRemoveItemIds(jobPositionRecords);

  // Array of new record objects from generic job position
  const jobPositionRecordObjects = recordsToCopy.map((r) => {
    const newTags = r.tags.includes(lavoraTagId)
      ? r.tags
      : r.tags.concat(lavoraTagId);
    return {
      itemType: workPositionModel.id,
      title: r.title,
      subtitle: r.subtitle,
      slug: r.slug,
      imageThumbnail: r.imageThumbnail,
      contentHasIndex: r.contentHasIndex,
      contentBlocks: r.contentBlocks,
      attachments: r.attachments,
      links: r.links,
      relatedAnnouncementItems: r.relatedAnnouncementItems,
      relatedItems: r.relatedItems,
      owners: r.owners,
      tags: newTags,
      office: "Dipartimento per la trasformazione digitale",
      announcementStatus: r.announcementStatus,
      legalReference: r.legalReference,
      fee: r.fee,
      dateShown: r.dateShown,
      announcementDateOpening: r.announcementDateOpening,
      announcementDateClosing: r.announcementDateClosing,
      announcementOwner: r.announcementOwner,
      announcementOwnerLink: r.announcementOwnerLink,
      jobPositionOwnerLink: r.jobPositionOwnerLink,
      seo: r.seo,
    };
  });

  // ===================================================
  // Fetch pnrr job position records
  const pnrrPositionRecords = await client.items.all({
    filter: {
      type: "pnrr_job_position",
    },
    nested: true,
    allPages: true,
  });

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

  // Remove id
  const pnrrRecordsToCopy = recursivelyRemoveItemIds(pnrrPositionRecords);

  // Array of pnrr record objects
  const pnrrRecordObjects = pnrrRecordsToCopy.map((r) => {
    const newTags = r.tags.filter((t) => t !== lavoraTagId).concat(pnrrTagId);
    return {
      itemType: workPositionModel.id,
      title: r.title,
      subtitle: r.subtitle,
      slug: r.slug,
      imageThumbnail: r.imageThumbnail,
      contentHasIndex: r.contentHasIndex,
      contentBlocks: r.contentBlocks,
      attachments: r.attachments,
      links: r.links,
      relatedAnnouncementItems: r.relatedAnnouncementItems,
      relatedItems: r.relatedItems,
      owners: r.owners,
      tags: newTags,
      office: "PNRR",
      announcementStatus: r.announcementStatus,
      legalReference: r.legalReference,
      fee: r.fee,
      dateShown: r.dateShown,
      announcementDateOpening: r.announcementDateOpening,
      announcementDateClosing: r.announcementDateClosing,
      announcementOwner: r.announcementOwner,
      announcementOwnerLink: r.announcementOwnerLink,
      jobPositionOwnerLink: r.jobPositionOwnerLink,
      seo: r.seo,
    };
  });

  const allRecordObjects = jobPositionRecordObjects.concat(pnrrRecordObjects);

  allRecordObjects.forEach(async (r) => {
    await client.items.create(r);
  });
};

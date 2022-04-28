"use strict";

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
  // Get all work position records
  const workPositionRecords = await client.items.all({
    filter: {
      type: "work_position",
    },
    allPages: true,
    version: "current",
  });

  const workPositionSlugs = workPositionRecords.map((r) => r.slug);

  // Get draft jobPositionRecords
  const draftJobPositions = await client.items.all({
    filter: {
      type: "job_position",
    },
    allPages: true,
    nested: true,
    version: "draft",
  });

  const toMigrateAsDraft = draftJobPositions.filter(
    (r) => !workPositionSlugs.includes(r.slug) && r.meta.status === "draft"
  );

  // Model for new records
  const workPositionModel = await client.itemType.find("work_position");

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
  const draftsToCopy = recursivelyRemoveItemIds(toMigrateAsDraft);

  // Array of new record objects from records to migrate
  const draftObjectsToCopy = draftsToCopy.map((r) => {
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

  // Migrate; create new record
  draftObjectsToCopy.forEach(async (r) => {
    await client.items.create(r);
  });
};

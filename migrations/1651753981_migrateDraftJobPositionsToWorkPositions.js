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

  // Get draft department jobPositionRecords
  const draftJobPositions = await client.items.all({
    filter: {
      type: "job_position",
    },
    allPages: true,
    nested: true,
    version: "draft",
  });

  // Get draft PNRR jobPositionRecords
  const draftPnrrPositions = await client.items.all({
    filter: {
      type: "pnrr_job_position",
    },
    allPages: true,
    nested: true,
    version: "draft",
  });

  const toMigrateAsDraft = draftJobPositions.filter(
    (r) => !workPositionSlugs.includes(r.slug) && r.meta.status === "draft"
  );

  const toMigrateAsDraftPnrr = draftPnrrPositions.filter(
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

  // Find record for office link to PNRR office
  const [pnrrOffice] = await client.items.all({
    filter: {
      type: "office",
      fields: {
        name: {
          eq: "PNRR",
        },
      },
    },
  });

  // Find record for office link to department office
  const [deptOffice] = await client.items.all({
    filter: {
      type: "office",
      fields: {
        name: {
          eq: "Dipartimento per la trasformazione digitale",
        },
      },
    },
  });

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
      officeLink: deptOffice.id,
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

  // Remove id
  const pnrrRecordsToCopy = recursivelyRemoveItemIds(toMigrateAsDraftPnrr);

  // Array of pnrr record objects
  const draftPnrrObjectsToCopy = pnrrRecordsToCopy.map((r) => {
    const newTags = r.tags
      .filter((t) => t !== lavoraTagId && t !== pnrrTagId)
      .concat(pnrrTagId);
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
      officeLink: pnrrOffice.id,
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

  const allRecordObjects = draftObjectsToCopy.concat(draftPnrrObjectsToCopy);

  // Migrate; create new record
  allRecordObjects.forEach(async (r) => {
    await client.items.create(r);
  });
};

"use strict";

module.exports = async (client) => {
  // Get all record ids for job position and pnrr_job position
  const jobPositionRecords = await client.items.all({
    filter: {
      type: "job_position, pnrr_job_position",
    },
  });

  const jobPositionRecordsIds = jobPositionRecords.map((r) => r.id);

  // Get all link_internal records pointing to any of these ids
  const linksInternals = await client.items.all({
    filter: {
      type: "link_internal",
      fields: {
        link: {
          in: jobPositionRecordsIds,
        },
      },
    },
  });

  linksInternals.forEach(async (linkRecord) => {
    const oldTargetRecord = await client.item.find(linkRecord.link, {});
    const slug = oldTargetRecord.slug;
    const [newTarget] = await client.items.all({
      filter: {
        type: "work_position",
        fields: {
          slug: {
            eq: slug,
          },
        },
      },
      version: "current",
    });

    const newTargetId = newTarget.id;
    const updatedLink = await client.items.update(linkRecord.id, {
      link: newTargetId,
    });
  });
};

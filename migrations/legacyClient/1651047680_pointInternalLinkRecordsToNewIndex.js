"use strict";
const util = require("util");

module.exports = async (client) => {
  //  ==========  INDEX MODELS  ==========
  // Get record ids for job_positions_index and pnrr_job_positions_index
  const indexRecords = await client.items.all({
    filter: {
      type: "job_positions_index, pnrr_job_positions_index",
    },
    allPages: true,
  });

  const indexRecordsIds = indexRecords.map((r) => r.id);

  // get all internal links pointing to any of these ids
  const linksToIndex = await client.items.all({
    filter: {
      type: "link_internal",
      fields: {
        link: {
          in: indexRecordsIds,
        },
      },
    },
  });

  // Get new work_positions_index record id
  const [workPositionsIndexRecord] = await client.items.all({
    filter: {
      type: "work_positions_index",
    },
  });

  const workPositionsIndexRecordId = workPositionsIndexRecord.id;

  // Modify those records to point to new work_position_index model
  let updatedLinksToIndex = linksToIndex.forEach(async (link) => {
    const updatedLink = await client.items.update(link.id, {
      link: workPositionsIndexRecordId,
    });
  });
};

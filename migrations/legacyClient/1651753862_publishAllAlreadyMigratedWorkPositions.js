"use strict";

module.exports = async (client) => {
  const workPositionRecords = await client.items.all({
    filter: {
      type: "work_position",
    },
    version: "current",
    allPages: true,
  });

  const recordIds = workPositionRecords.map((r) => r.id);

  const result = await client.item.bulkPublish({
    items: recordIds,
  });
};

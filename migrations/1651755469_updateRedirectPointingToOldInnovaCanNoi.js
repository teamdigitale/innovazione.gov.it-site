"use strict";
const util = require("util");

module.exports = async (client) => {
  // Find old innovate record
  const [oldInnovate] = await client.items.all({
    filter: {
      type: "department_subpage",
      fields: {
        slug: {
          eq: "innova-con-noi",
        },
      },
    },
  });

  // Find redirect record to update
  const redirectsToOldInnovate = await client.items.all({
    filter: {
      type: "resource_redirect",
      fields: {
        link: {
          eq: oldInnovate.id,
        },
      },
    },
  });

  const redirectsIds = redirectsToOldInnovate.map((r) => r.id);

  // Find new innovate record
  const [destinationRecord] = await client.items.all({
    filter: {
      type: "innovate_page",
    },
    version: "current",
  });

  const newDestinationId = destinationRecord.id;

  // Publish new innovate record
  const publishedDestination = await client.item.publish(destinationRecord.id, {
    recursive: true,
  });

  // Update redirect record
  redirectsIds.forEach(async (id) => {
    await client.items.update(id, {
      link: newDestinationId,
    });
  });
};

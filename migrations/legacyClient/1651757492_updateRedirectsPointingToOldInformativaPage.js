"use strict";
const util = require("util");

module.exports = async (client) => {
  // Find old informativa record
  const [oldInformativa] = await client.items.all({
    filter: {
      type: "department_subpage",
      fields: {
        slug: {
          eq: "informativa-trattamento-dati-personali-candidati",
        },
      },
    },
  });

  // Find redirect record to update
  const redirectsToOldInformativa = await client.items.all({
    filter: {
      type: "resource_redirect",
      fields: {
        link: {
          eq: oldInformativa.id,
        },
      },
    },
  });

  const redirectsIds = redirectsToOldInformativa.map((r) => r.id);

  // Find new informativa record
  const [destinationRecord] = await client.items.all({
    filter: {
      type: "innovate_subpage",
      fields: {
        slug: {
          eq: "informativa-trattamento-dati",
        },
      },
    },
  });

  const newDestinationId = destinationRecord.id;

  // Update redirect record
  redirectsIds.forEach(async (id) => {
    const updated = await client.items.update(id, {
      link: newDestinationId,
    });
  });

  // Create redirect from old Informativa page to new
  const redirectModel = await client.itemType.find("resource_redirect");

  const oldUrl =
    "https://innovazione.gov.it/dipartimento/innova-con-noi/informativa-trattamento-dati-personali-candidati/";

  // Create redirect
  await client.items.create({
    itemType: redirectModel.id,
    oldUrl: { it: oldUrl },
    link: destinationRecord.id,
  });
};

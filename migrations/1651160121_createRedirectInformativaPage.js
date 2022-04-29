"use strict";
const util = require("util");

module.exports = async (client) => {
  // Retrieve redirect item type
  const redirectModel = await client.itemType.find("resource_redirect");

  // ====== Redirect for informativa privacy ======
  // Find old informativa record
  const oldUrl =
      "https://innovazione.gov.it/dipartimento/innova-con-noi/informativa-trattamento-dati-personali-candidati/",
    // Find the destination record
    [destinationRecord] = await client.items.all({
      filter: {
        type: "innovate_subpage",
        fields: {
          slug: {
            eq: "informativa-trattamento-dati",
          },
        },
      },
    });

  // Create redirect
  await client.items.create({
    itemType: redirectModel.id,
    oldUrl: { it: oldUrl },
    link: destinationRecord.id,
  });
};

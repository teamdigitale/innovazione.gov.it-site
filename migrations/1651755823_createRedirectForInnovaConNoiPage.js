"use strict";

module.exports = async (client) => {
  // Retrieve redirect item type
  const redirectModel = await client.itemType.find("resource_redirect");

  // ====== Redirect for informativa privacy ======
  // Find old informativa record
  const oldUrl = "https://innovazione.gov.it/dipartimento/innova-con-noi/",
    // Find the destination record
    [destinationRecord] = await client.items.all({
      filter: {
        type: "innovate_page",
      },
    });

  // Create redirect
  await client.items.create({
    itemType: redirectModel.id,
    oldUrl: { it: oldUrl },
    link: destinationRecord.id,
  });
};

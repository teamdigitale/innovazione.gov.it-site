"use strict";

module.exports = async (client) => {
  // Retrieve redirect item type
  const redirectModel = await client.itemType.find("resource_redirect");

  // ====== Redirect for informativa privacy ======
  // Find old jobs positions index record
  const oldUrl =
      "https://innovazione.gov.it/dipartimento/posizioni-lavorative/",
    // Find the destination record
    [destinationRecord] = await client.items.all({
      filter: {
        type: "work_positions_index",
      },
    });

  // Create redirect
  await client.items.create({
    itemType: redirectModel.id,
    oldUrl: { it: oldUrl },
    link: destinationRecord.id,
  });
};

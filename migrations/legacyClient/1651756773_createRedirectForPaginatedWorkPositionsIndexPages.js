"use strict";

module.exports = async (client) => {
  // Retrieve redirect item type
  const redirectModel = await client.itemType.find("resource_redirect");

  // ====== Redirect for informativa privacy ======
  // Old jobs positions index urls
  const oldUrlPage2 =
    "https://innovazione.gov.it/dipartimento/posizioni-lavorative/page/2/";

  const oldUrlPage3 =
    "https://innovazione.gov.it/dipartimento/posizioni-lavorative/page/3/";

  // Find the destination record
  const [destinationRecord] = await client.items.all({
    filter: {
      type: "work_positions_index",
    },
  });

  // Create redirect page 1
  await client.items.create({
    itemType: redirectModel.id,
    oldUrl: { it: oldUrlPage2 },
    link: destinationRecord.id,
  });

  // Create redirect page 2
  await client.items.create({
    itemType: redirectModel.id,
    oldUrl: { it: oldUrlPage3 },
    link: destinationRecord.id,
  });
};

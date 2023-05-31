"use strict";

module.exports = async (client) => {
  // Retrieve redirect item type
  const redirectModel = await client.itemType.find("resource_redirect");

  // ====== Redirect for informativa privacy ======
  // Find old jobs positions index record
  const oldUrl =
    "https://innovazione.gov.it/dipartimento/posizioni-lavorative-pnrr/";

  // Find the destination record
  const [destinationRecord] = await client.items.all({
    filter: {
      type: "tag",
      fields: {
        slug: { eq: "lavora-con-noi-pnrr" },
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

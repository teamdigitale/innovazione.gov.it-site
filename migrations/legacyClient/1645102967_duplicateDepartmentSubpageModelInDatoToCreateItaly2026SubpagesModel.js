"use strict";

module.exports = async (client) => {
  // create copy
  const subpageCopy = await client.itemType.duplicate("department_subpage");

  // modify copy
  await client.itemType.update(subpageCopy.id, {
    name: "Scheda Italia 2026",
    apiKey: "italy2026_subpage",
  });
};

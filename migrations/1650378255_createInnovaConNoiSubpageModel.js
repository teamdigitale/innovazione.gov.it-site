"use strict";

module.exports = async (client) => {
  // create copy
  const subpageCopy = await client.itemType.duplicate("department_subpage");

  // modify copy
  await client.itemType.update(subpageCopy.id, {
    name: "Scheda innova con noi",
    apiKey: "innovate_subpage",
  });
};

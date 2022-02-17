"use strict";

module.exports = async (client) => {
  // Retrieve italy 2026 model
  const italy2026Model = await client.itemType.find("italy2026");
  const updatedItaly2026Model = await client.itemType.update(
    italy2026Model.id,
    {
      apiKey: "italy2026_page",
    }
  );
};

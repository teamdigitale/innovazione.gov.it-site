"use strict";

module.exports = async (client) => {
  // Find work positions index page record
  const [workPositionsIndex] = await client.items.all({
    filter: {
      type: "work_positions_index",
      fields: {
        slug: {
          eq: "posizioni-lavorative-2",
        },
      },
    },
  });

  await client.items.update(workPositionsIndex.id, {
    slug: "posizioni-lavorative",
  });
};

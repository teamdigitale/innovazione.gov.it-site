"use strict";

module.exports = async (client) => {
  const [oldInnovate] = await client.items.all({
    filter: {
      type: "department_subpage",
      fields: {
        slug: {
          eq: "innova-con-noi",
        },
      },
    },
  });

  await client.item.destroy(oldInnovate.id);
};

"use strict";

module.exports = async (client) => {
  const [oldInformativa] = await client.items.all({
    filter: {
      type: "department_subpage",
      fields: {
        slug: {
          eq: "informativa-trattamento-dati-personali-candidati",
        },
      },
    },
  });

  await client.item.destroy(oldInformativa.id);
};

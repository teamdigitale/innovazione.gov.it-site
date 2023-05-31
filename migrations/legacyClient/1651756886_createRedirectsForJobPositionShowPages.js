"use strict";

module.exports = async (client) => {
  // Retrieve redirect item type
  const redirectModel = await client.itemType.find("resource_redirect");

  // Create an array of slugs for records
  const records = await client.items.all({
    filter: {
      type: "work_position",
      fields: {
        office: { eq: "Dipartimento per la trasformazione digitale" },
      },
    },
    allPages: true,
  });

  const slugs = records.map((r) => r.slug);
  const firstPart =
    "https://innovazione.gov.it/dipartimento/posizioni-lavorative/";

  slugs.forEach(async (slug) => {
    const oldUrl = `${firstPart}${slug}/`;

    const [destinationRecord] = await client.items.all({
      filter: {
        type: "work_position",
        fields: {
          slug: { eq: slug },
        },
      },
    });

    await client.items.create({
      itemType: redirectModel.id,
      oldUrl: { it: oldUrl },
      link: destinationRecord.id,
    });
  });
};

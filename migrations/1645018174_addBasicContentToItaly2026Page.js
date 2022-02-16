"use strict";

module.exports = async (client) => {
  // Retrive page model
  const italy2026Model = await client.itemType.find("italy2026");

  // Retrieve image from hero banner in homepage record
  const uploads = await client.uploads.all({
    filter: {
      fields: {
        type: {
          eq: "image",
        },
        filename: {
          matches: {
            pattern: "italia-digitale-2026.jpg",
          },
        },
      },
    },
  });

  const bannerImage = uploads[0];

  // Create page record
  const page = await client.items.create({
    itemType: italy2026Model.id,
    image: bannerImage,
    title: "Italia digitale 2026",
    subtitle:
      "Obiettivi e iniziative per il digitale nel Piano nazionale di ripresa e resilienza",
    menuLabel: "Italia digitale",
    slug: "italia-digitale",
    seo: {
      title: "Italia digitale",
      description:
        "Obiettivi e iniziative per il digitale nel Piano nazionale di ripresa e resilienza",
    },
  });
};

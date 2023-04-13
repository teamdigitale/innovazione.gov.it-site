"use strict";

module.exports = async (client) => {
  // Retrive page model
  const italy2026Model = await client.itemType.find("italy2026_page");

  // Retrieve image from hero banner in homepage record
  const uploads = await client.uploads.all({
    filter: {
      fields: {
        type: {
          eq: "image",
        },
        filename: {
          matches: {
            //pattern: "img_header_crop.png",
            pattern: "italia-digitalemitd2021bynasacover.jpg",
          },
        },
      },
    },
  });

  const bannerImage = uploads[0];

  // Create page record
  await client.items.create({
    itemType: italy2026Model.id,
    image: {
      uploadId: bannerImage.id,
    },
    title: "Italia digitale 2026",
    subtitle:
      "Obiettivi e iniziative per il digitale nel Piano nazionale di ripresa e resilienza",
    menuLabel: "Italia digitale 2026",
    slug: "italia-digitale-2026",
    seo: {
      title: "Italia digitale 2026",
      description:
        "Obiettivi e iniziative per il digitale nel Piano nazionale di ripresa e resilienza",
    },
  });
};

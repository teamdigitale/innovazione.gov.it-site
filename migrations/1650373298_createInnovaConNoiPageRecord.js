"use strict";
const util = require("util");

module.exports = async (client) => {
  // Find 'lavora con noi' tag record
  const tags = await client.items.all({
    filter: {
      type: "tag",
      fields: {
        name: {
          eq: "Lavora con noi",
        },
      },
    },
  });

  const lavoraConNoiTag = tags[0];
  const lavoraConNoiTagId = lavoraConNoiTag.id;

  // Retrieve tag model
  const tagModel = await client.itemType.find("tag");

  // Create new tag for PNRR positions
  const tagPNRR = await client.items.create({
    itemType: tagModel.id,
    name: "Lavora con noi PNRR",
    slug: "lavora-con-noi-pnrr",
    imageCoverDescription: { it: "" },
  });

  const PNRRTagId = tagPNRR.id;

  // Retrive target record
  const targetRecords = await client.items.all({
    filter: {
      type: "target",
      fields: {
        name: {
          eq: "Cittadini",
        },
      },
    },
  });
  const targetId = targetRecords[0].id;

  // Create new record
  const innovaConNoiModel = await client.itemType.find("innovate_page");
  await client.items.create({
    itemType: innovaConNoiModel.id,
    title: "Innova con noi",
    subtitle:
      "Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Dictum sit amet justo donec enim diam vulputate ut. Eu nisl nunc mi ipsum faucibus.",
    slug: "innova-con-noi",
    menuLabel: "Innova con noi",
    tags: [lavoraConNoiTagId, PNRRTagId],
    targets: [targetId],
    seo: {
      title: "Innova con noi",
      description:
        "Lavora con noi e diventa un esperto per la trasformazione digitale.",
    },
  });
};

"use strict";

module.exports = async (client) => {
  // Retrieve page model
  const innovateSubpage = await client.itemType.find("innovate_subpage");

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

  // Find pnrr tag record
  const filteredTags = await client.items.all({
    filter: {
      type: "tag",
      fields: {
        name: {
          eq: "Lavora con noi PNRR",
        },
      },
    },
  });

  const pnrrTag = filteredTags[0];
  const pnrrTagId = pnrrTag.id;

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

  // Create new subpage record
  const faq = await client.items.create({
    itemType: innovateSubpage.id,
    title: { it: "Domande frequenti" },
    dateShown: "2022-04-15",
    subtitle: {
      it: "Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Dictum sit amet justo donec enim diam vulputate ut. Eu nisl nunc mi ipsum faucibus.",
    },
    slug: { it: "domande-frequenti" },
    tags: [lavoraConNoiTagId, pnrrTagId],
    targets: [targetId],
    seo: {
      it: {
        title: "Domande frequenti",
        description: "Domande frequenti",
      },
    },
  });

  await client.item.publish(faq.id, {
    recurisve: "false",
  });
};

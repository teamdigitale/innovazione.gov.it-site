"use strict";

module.exports = async (client) => {
  // Retrive page model
  const italy2026Subpage = await client.itemType.find("italy2026_subpage");

  // Retrive tag record
  const tagRecords = await client.items.all({
    filter: {
      type: "tag",
    },
  });

  const tag = tagRecords.find((r) => r.name == "Italia digitale 2026");

  // Retrive target record
  const targetRecords = await client.items.all({
    filter: {
      type: "target",
    },
  });

  const targets = targetRecords.map((r) => r.id);

  // Create Italy 2026 articles index page record
  const ilPianoPage = await client.items.create({
    itemType: italy2026Subpage.id,
    title: {
      it: "Il Piano",
    },
    subtitle: {
      it: "Il Piano nazionale di ripresa e resilienza",
    },
    slug: {
      it: "il-piano",
    },
    dateShown: "2022-12-15",
    tags: [tag.id],
    targets: targets,
    seo: {
      it: {
        title: "Il Piano nazionale di ripresa e resilienza",
        description:
          "Obiettivi e iniziative per il digitale nel Piano nazionale di ripresa e resilienza",
      },
    },
  });

  await client.item.publish(ilPianoPage.id, {
    recurisve: "false",
  });
};

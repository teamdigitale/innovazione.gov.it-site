"use strict";

module.exports = async (client) => {
  // List all tag records
  const subpages = await client.items.all({
    filter: {
      type: "italy2026_subpage",
      version: "current",
    },
  });

  // Records to link
  const ilPiano = subpages.find((r) => r.title.it == "Il Piano");
  const gliObiettivi = subpages.find((r) => r.title.it == "Gli obiettivi");

  // Internal link model
  const linkInternalModel = await client.itemType.find("link_internal");

  // Create internal link to 'Il Piano'
  await client.items.create({
    itemType: linkInternalModel.id,
    title: "Il Piano",
    link: ilPiano.id,
    ctaLabel: "Scopri di più",
  });

  // Create internal link to 'Gli obiettivi'
  await client.items.create({
    itemType: linkInternalModel.id,
    title: "Gli obiettivi",
    link: gliObiettivi.id,
    ctaLabel: "Scopri di più",
  });
};

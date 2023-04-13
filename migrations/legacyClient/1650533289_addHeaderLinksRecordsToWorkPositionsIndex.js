"use strict";

module.exports = async (client) => {
  // Create internal links to innovate subpages

  // List all subpages
  const subpages = await client.items.all({
    filter: {
      type: "innovate_subpage",
      version: "current",
    },
  });

  // Records to link
  const faq = subpages.find((r) => r.title.it == "Domande frequenti");
  const trattamento = subpages.find(
    (r) => r.title.it == "Informativa trattamento dati"
  );

  // Internal link model
  const linkInternalModel = await client.itemType.find("link_internal");

  // Create internal link to faq record
  const faqLink = await client.items.create({
    itemType: linkInternalModel.id,
    title: "Domande frequenti",
    link: faq.id,
    ctaLabel: "Domande frequenti",
  });

  // Create internal link to trattamento record
  const trattamentoLink = await client.items.create({
    itemType: linkInternalModel.id,
    title: "Informativa trattamento dati",
    link: trattamento.id,
    ctaLabel: "Informativa trattamento dati",
  });

  // Now we add these internal links to header_links in work_positions index.

  // Find work_positions_index record
  const workPositionsIndexRecords = await client.items.all({
    filter: {
      type: "work_positions_index",
    },
  });

  const workPositionsIndexRecord = workPositionsIndexRecords[0];

  await client.items.update(workPositionsIndexRecord.id, {
    headerLinks: [trattamentoLink.id, faqLink.id],
  });
};

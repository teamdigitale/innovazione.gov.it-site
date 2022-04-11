"use strict";

module.exports = async (client) => {
  // Retrive page models
  const articlesIndex = await client.itemType.find("italy2026_articles_index");
  const pressReleasesIndex = await client.itemType.find(
    "italy2026_press_releases_index"
  );
  const announcementsIndex = await client.itemType.find(
    "italy2026_announcements_index"
  );

  // Create Italy 2026 articles index page record
  await client.items.create({
    itemType: articlesIndex.id,
    title: "Articoli di Italia Digitale 2026",
    menuLabel: "Articoli",
    slug: "articoli",
    seo: {
      title: "Articoli Italia Digitale",
      description: "Articoli di Italia Digitale 2026",
    },
  });

  // Create Italy 2026 press releases index page record
  await client.items.create({
    itemType: pressReleasesIndex.id,
    title: "Comunicati Stampa di Italia Digitale 2026",
    menuLabel: "Comunicati stampa",
    slug: "comunicati-stampa",
    seo: {
      title: "Comunicati Stampa di Italia Digitale 2026",
      description: "Comunicati Stampa di Italia Digitale 2026",
    },
  });

  // Create Italy 2026 announcements index page record
  await client.items.create({
    itemType: announcementsIndex.id,
    title: "Avvisi Pubblici di Italia Digitale 2026",
    menuLabel: "Avvisi pubblici",
    slug: "avvisi-pubblici",
    seo: {
      title: "Avvisi pubblici di Italia Digitale 2026",
      description: "Avvisi pubblici di Italia Digitale 2026",
    },
  });
};

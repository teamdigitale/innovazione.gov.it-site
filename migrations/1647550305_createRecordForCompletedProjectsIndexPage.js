"use strict";

module.exports = async (client) => {
  // Retrive page model
  const completedProjects = await client.itemType.find(
    "completed_projects_index"
  );

  // Create page record
  await client.items.create({
    itemType: completedProjects.id,
    title: "Progetti conclusi",
    menuLabel: "Progetti conclusi",
    slug: "progetti-conclusi",
    seo: {
      title: "Progetti conclusi",
      description: "Pagina elenco dei progetti conclusi",
    },
  });
};

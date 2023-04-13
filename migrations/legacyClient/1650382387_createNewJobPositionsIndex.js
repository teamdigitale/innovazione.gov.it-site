"use strict";

module.exports = async (client) => {
  // create copy
  const copy = await client.itemType.duplicate("job_positions_index");

  // modify copy
  const workPositionsIndex = await client.itemType.update(copy.id, {
    name: "Indice posizioni lavorative 2",
    apiKey: "work_positions_index",
    singleton: true,
  });

  // Find copy menu item
  const menuItems = await client.menuItems.all();
  const copyMenuItem = menuItems.find(
    (item) => item.label === "Indice Posizioni lavorative (copy #1)"
  );

  // Find parent menu item
  const parentMenuItem = menuItems.find(
    (item) => item.label === "Posizione lavorativa 2"
  );

  // Update menu item
  await client.menuItem.update(copyMenuItem.id, {
    label: "Indice posizioni lavorative 2",
    position: 9,
    itemType: workPositionsIndex.id,
    parent: parentMenuItem.id,
  });

  // Create page record
  await client.items.create({
    itemType: workPositionsIndex.id,
    title: "Posizioni lavorative",
    subtitle:
      "Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Dictum sit amet justo donec enim diam vulputate ut. Eu nisl nunc mi ipsum faucibus.",
    menuLabel: "Posizioni lavorative",
    slug: "posizioni-lavorative-2",
    seo: {
      title: "Posizioni lavorative",
      description:
        "Lavora con noi: unisciti al Dipartimento per la trasformazione digitale e lavora con il Ministro per l'innovazione tecnologica e transizione digitale",
    },
  });
};

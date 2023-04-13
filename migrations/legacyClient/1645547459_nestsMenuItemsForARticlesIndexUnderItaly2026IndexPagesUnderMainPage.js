"use strict";

module.exports = async (client) => {
  // List all menu items
  const menuItems = await client.menuItems.all();

  // Find parent menu item
  const italy2026MenuItem = menuItems.find(
    (item) => item.label === "Italia 2026"
  );

  // Find and update menu item for Italy 2026 articles index model
  const articlesIndexMenuItem = menuItems.find(
    (item) => item.label === "Indice Articoli Italia 2026"
  );

  const articlesIndexModel = await client.itemType.find(
    "italy2026_articles_index"
  );

  await client.menuItem.update(articlesIndexMenuItem.id, {
    label: "Indice Articoli Italia 2026",
    position: 6,
    itemType: articlesIndexModel.id,
    parent: italy2026MenuItem.id,
  });
};

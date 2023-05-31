"use strict";

module.exports = async (client) => {
  // List all menu items
  const menuItems = await client.menuItems.all();

  // Find parent menu item
  const italy2026MenuItem = menuItems.find(
    (item) => item.label === "Italia 2026"
  );

  const pressReleasesIndexModel = await client.itemType.find(
    "italy2026_press_releases_index"
  );

  // Find and update menu item for Italy 2026 press releases index model
  const pressReleasesIndexMenuItem = menuItems.find(
    (item) => item.label === "Indice Comunicati Stampa Italia 2026"
  );

  await client.menuItem.update(pressReleasesIndexMenuItem.id, {
    label: "Indice Comunicati Stampa Italia 2026",
    position: 6,
    itemType: pressReleasesIndexModel.id,
    parent: italy2026MenuItem.id,
  });
};

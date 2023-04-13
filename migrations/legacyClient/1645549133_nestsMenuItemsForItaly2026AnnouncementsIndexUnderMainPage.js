"use strict";

module.exports = async (client) => {
  // List all menu items
  const menuItems = await client.menuItems.all();

  // Find parent menu item
  const italy2026MenuItem = menuItems.find(
    (item) => item.label === "Italia 2026"
  );
  // Find menu item for Italy 2026 announcements index model
  const announcementsIndexModel = await client.itemType.find(
    "italy2026_announcements_index"
  );

  // Find and update menu item for Italy 2026 announcements index model
  const announcementsIndexMenuItem = menuItems.find(
    (item) => item.label === "Indice Avvisi Pubblici Italia 2026"
  );

  await client.menuItem.update(announcementsIndexMenuItem.id, {
    label: "Indice Avvisi Pubblici Italia 2026",
    position: 6,
    itemType: announcementsIndexModel.id,
    parent: italy2026MenuItem.id,
  });
};

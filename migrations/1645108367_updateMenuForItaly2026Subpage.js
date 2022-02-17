"use strict";

module.exports = async (client) => {
  // Find copy menu item
  const menuItems = await client.menuItems.all();
  const copyMenuItem = menuItems.find(
    (item) => item.label === "Scheda Dipartimento (copy #1)"
  );

  // Find parent menu item
  const italy2026MenuItem = menuItems.find(
    (item) => item.label === "Italia 2026"
  );

  // Find item type id
  const subpage = await client.itemType.find("italy2026_subpage");

  // Update menu item
  const updatedItem = await client.menuItem.update(copyMenuItem.id, {
    label: "Pagine",
    position: 8,
    itemType: subpage.id,
    parent: italy2026MenuItem.id,
  });

  // Update  parent menu item's position
  const italy2026Model = await client.itemType.find("italy2026");
  const updatedItaly2026MenuItem = await client.menuItem.update(
    italy2026MenuItem.id,
    {
      label: "Italia 2026",
      position: 6,
      itemType: italy2026Model.id,
    }
  );
};

"use strict";

module.exports = async (client) => {
  // Find copy menu item
  const menuItems = await client.menuItems.all();
  const copyMenuItem = menuItems.find(
    (item) => item.label === "Scheda Dipartimento (copy #1)"
  );

  // Find parent menu item
  const innovateMenuItem = menuItems.find(
    (item) => item.label === "Innova con noi"
  );

  // Find item type id
  const subpage = await client.itemType.find("innovate_subpage");

  // Update menu item
  await client.menuItem.update(copyMenuItem.id, {
    label: "Pagine",
    position: 7,
    itemType: subpage.id,
    parent: innovateMenuItem.id,
  });

  // Update  parent menu item's position
  const innovateModel = await client.itemType.find("innovate_page");
  await client.menuItem.update(innovateMenuItem.id, {
    label: "Innova con noi",
    position: 6,
    itemType: innovateModel.id,
  });
};

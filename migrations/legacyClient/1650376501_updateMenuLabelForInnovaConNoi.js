"use strict";

module.exports = async (client) => {
  // Find page menu item
  const menuItems = await client.menuItems.all();
  const innovaConNoiMenuItem = menuItems.find(
    (item) => item.label === "Scheda Dipartimento (copy #1)"
  );

  // Update menu item
  const innovaConNoiModel = await client.itemType.find("innovate_page");
  await client.menuItem.update(innovaConNoiMenuItem.id, {
    label: "Innova con noi",
    position: 6,
    itemType: innovaConNoiModel.id,
  });
};

"use strict";
const util = require("util");

module.exports = async (client) => {
  // Find job position menu item
  const menuItems = await client.menuItems.all();
  const jobPositionMenuItem = menuItems.find(
    (item) => item.label === "Posizione lavorative"
  );
  const pnrrMenuItem = menuItems.find(
    (item) => item.label === "Posizione lavorativa PNRR"
  );

  const deleted1 = await client.menuItem.destroy(jobPositionMenuItem.id);
  const deleted2 = await client.menuItem.destroy(pnrrMenuItem.id);
};

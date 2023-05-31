"use strict";

module.exports = async (client) => {
  const menuItems = await client.menuItems.all();
  const workPositionMenuItem = menuItems.find(
    (item) => item.label === "Posizione lavorativa 2"
  );
  const indexMenuItem = menuItems.find(
    (item) => item.label === "Indice posizioni lavorative 2"
  );

  await client.menuItem.update(workPositionMenuItem.id, {
    label: "Posizione lavorativa",
    position: 8,
  });

  await client.menuItem.update(indexMenuItem.id, {
    label: "Indice posizioni lavorative",
    position: 9,
  });
};

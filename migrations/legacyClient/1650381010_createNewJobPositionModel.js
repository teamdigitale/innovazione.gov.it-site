"use strict";

module.exports = async (client) => {
  // create copy
  const jobPositionCopy = await client.itemType.duplicate("job_position");

  // modify copy
  const workPosition = await client.itemType.update(jobPositionCopy.id, {
    name: "Posizione lavorativa 2",
    apiKey: "work_position",
    draftModeActive: true,
  });

  // Find copy menu item
  const menuItems = await client.menuItems.all();
  const copyMenuItem = menuItems.find(
    (item) => item.label === "Posizione lavorativa (copy #1)"
  );

  // Find parent menu item
  const innovateMenuItem = menuItems.find(
    (item) => item.label === "Innova con noi"
  );

  // Update menu item
  await client.menuItem.update(copyMenuItem.id, {
    label: "Posizione lavorativa 2",
    position: 8,
    itemType: workPosition.id,
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

"use strict";
const util = require("util");

module.exports = async (client) => {
  // Create new office model
  const officeModel = await client.itemType.create({
    name: "Ufficio",
    apiKey: "office",
    singleton: false,
    allLocalesRequired: false,
  });

  // Add string field to office model
  await client.fields.create(officeModel.id, {
    label: "Nome",
    apiKey: "name",
    fieldType: "string",
    validators: {
      required: {},
      unique: {},
    },
    appearance: {
      editor: "single_line",
      parameters: {
        heading: false,
      },
      addons: [],
    },
  });

  // Add two records
  await client.items.create({
    itemType: officeModel.id,
    name: "PNRR",
  });

  await client.items.create({
    itemType: officeModel.id,
    name: "Dipartimento per la trasformazione digitale",
  });

  // Update menu item and nest under innova con noi
  const menuItems = await client.menuItems.all();
  const copyMenuItem = menuItems.find((item) => item.label === "Ufficio");

  // Find parent menu item
  const innovateMenuItem = menuItems.find(
    (item) => item.label === "Innova con noi"
  );

  // Find item type id

  // Update menu item
  await client.menuItem.update(copyMenuItem.id, {
    label: "Ufficio",
    position: 7,
    itemType: officeModel.id,
    parent: innovateMenuItem.id,
  });

  // Update  parent menu item's position
  const innovateModel = await client.itemType.find("innovate_page");
  await client.menuItem.update(innovateMenuItem.id, {
    label: "Innova con noi",
    position: 6,
    itemType: innovateModel.id,
  });

  // Create link field in work position model
  const workPositionModel = await client.itemType.find("work_position");

  await client.fields.create(workPositionModel.id, {
    label: "Ufficio di riferimento",
    apiKey: "office_link",
    fieldType: "link",
    position: 4,
    validators: {
      required: {},
      itemItemType: {
        itemTypes: [officeModel.id],
      },
    },
    appearance: {
      editor: "link_embed",
      parameters: {},
      addons: [],
    },
  });
};

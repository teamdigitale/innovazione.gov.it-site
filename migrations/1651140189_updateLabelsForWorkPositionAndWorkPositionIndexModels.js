"use strict";
const util = require("util");

module.exports = async (client) => {
  const workPosition = await client.itemType.find("work_position");
  const workPositionsIndex = await client.itemType.find("work_positions_index");

  const updatedWorkPosition = client.itemType.update(workPosition.id, {
    name: "Posizione lavorativa",
  });

  const updatedIndex = client.itemType.update(workPositionsIndex.id, {
    name: "Indice posizioni lavorative",
  });
};

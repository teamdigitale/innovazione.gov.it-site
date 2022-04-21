"use strict";

module.exports = async (client) => {
  const milestoneBlock = await client.itemType.find("block_milestone");

  await client.fields.create(milestoneBlock.id, {
    label: "Durata molto lunga (più di 18 mesi)",
    apiKey: "long_duration",
    fieldType: "boolean",
    validators: {},
    hint: "La linea tra eventi nel calendario verrà tratteggiata alla fine",
    appearance: {
      editor: "boolean",
      parameters: {},
      addons: [],
    },
  });
};

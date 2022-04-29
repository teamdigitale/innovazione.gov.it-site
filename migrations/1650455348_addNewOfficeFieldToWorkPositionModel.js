"use strict";

module.exports = async (client) => {
  // Retrieve work_position model
  const workPositionModel = await client.itemType.find("work_position");

  // Add new field
  await client.fields.create(workPositionModel.id, {
    label: "Ufficio",
    apiKey: "office",
    position: 3,
    fieldType: "string",
    validators: {
      required: {},
      enum: {
        values: ["PNRR", "Dipartimento per la trasformazione digitale"],
      },
    },
    appearance: {
      editor: "string_select",
      parameters: {
        options: [
          { label: "PNRR", value: "PNRR" },
          {
            label: "Dipartimento per la trasformazione digitale",
            value: "Dipartimento per la trasformazione digitale",
          },
        ],
      },
      addons: [],
    },
  });
};

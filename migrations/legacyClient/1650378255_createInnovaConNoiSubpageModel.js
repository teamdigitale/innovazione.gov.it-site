"use strict";

module.exports = async (client) => {
  // create copy
  const subpageCopy = await client.itemType.duplicate("department_subpage");

  // modify copy
  await client.itemType.update(subpageCopy.id, {
    name: "Scheda innova con noi",
    apiKey: "innovate_subpage",
  });

  //// Update date_shown so it is not required
  //await client.field.update("innovate_subpage::date_shown", {
  //  validators: {},
  //});

  // Update subtitle max limit
  await client.field.update("innovate_subpage::subtitle", {
    validators: {
      required: {},
      length: {
        max: 180, // increase max
      },
    },
  });
};

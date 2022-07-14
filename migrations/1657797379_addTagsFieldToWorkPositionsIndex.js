"use strict";
const util = require("util");

module.exports = async (client) => {
  // Retrieve work_positions_index model
  const workPositionsIndexModel = await client.itemType.find(
    "work_positions_index"
  );

  // Add tags
  const tagModel = await client.itemType.find("tag");

  await client.fields.create(workPositionsIndexModel.id, {
    label: "Argomenti",
    apiKey: "tags",
    fieldType: "links",
    position: 5,
    validators: {
      size: {
        max: 4,
      },
      itemsItemType: {
        item_types: [tagModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });

  // Retrieve page record
  const [workPositionsIndexRecord] = await client.items.all({
    filter: {
      type: "work_positions_index",
    },
  });
  console.log(
    "workPositionsIndexRecord:",
    util.inspect(workPositionsIndexRecord, false, 8, true)
  );
  console.log("============================");

  // Find 'lavora con noi PNRR' tag record
  const [lavoraConNoiTag] = await client.items.all({
    filter: {
      type: "tag",
      fields: {
        name: {
          eq: "Lavora con noi PNRR",
        },
      },
    },
  });
  console.log(
    "lavoraConNoiTag:",
    util.inspect(lavoraConNoiTag, false, 8, true)
  );
  console.log("============================");

  // Change 'Lavora con noi PNRR' tag title
  //await client.items.update(lavoraConNoiTag.id, {
  //  name: "Posizioni lavorative PNRR",
  //});

  // Add tag to page record
  await client.items.update(workPositionsIndexRecord.id, {
    headerLinks: [],
    tags: [lavoraConNoiTag.id],
  });

  // Change 'Lavora con noi PNRR' tag title
  await client.items.update(lavoraConNoiTag.id, {
    name: "Posizioni lavorative PNRR",
  });
};

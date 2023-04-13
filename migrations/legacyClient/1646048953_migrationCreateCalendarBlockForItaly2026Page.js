"use strict";

module.exports = async (client) => {
  // Create new block
  const calendarBlock = await client.itemTypes.create({
    name: "Blocco Cronoprogrammi",
    apiKey: "block_calendar",
    modularBlock: true,
  });

  // Add title
  await client.fields.create(calendarBlock.id, {
    label: "Titolo",
    apiKey: "title",
    fieldType: "string",
    validators: {
      required: {},
      length: {
        max: 60,
      },
    },
    appearance: {
      editor: "single_line",
      parameters: {
        heading: true,
      },
      addons: [],
    },
  });

  await client.fields.create(calendarBlock.id, {
    label: "Titolo di sezione nel menù di navigazione",
    apiKey: "menu_title",
    fieldType: "string",
    position: 1,
    validators: {
      required: {},
      length: {
        max: 40,
      },
    },
    appearance: {
      editor: "single_line",
      parameters: {
        heading: false,
      },
      addons: [],
    },
  });

  // Add multiple links
  const calendarModel = await client.itemType.find("calendar");

  await client.fields.create(calendarBlock.id, {
    label: "Calendari",
    apiKey: "calendars",
    fieldType: "links",
    validators: {
      size: {
        max: 12,
      },
      itemsItemType: {
        item_types: [calendarModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });
};

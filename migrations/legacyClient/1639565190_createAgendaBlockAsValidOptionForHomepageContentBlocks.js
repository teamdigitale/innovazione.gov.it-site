"use strict";

module.exports = async (client) => {
  const agendaBlock = await client.itemTypes.create({
    name: "Blocco Agenda",
    apiKey: "block_agenda",
    modularBlock: true,
  });

  await client.fields.create(agendaBlock.id, {
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

  const eventModel = await client.itemType.find("schedule_event");

  await client.fields.create(agendaBlock.id, {
    label: "Evento Agenda",
    apiKey: "agenda_events",
    fieldType: "links",
    validators: {
      size: {
        min: 2,
        max: 8,
      },
      itemsItemType: {
        item_types: [eventModel.id],
      },
    },
    appearance: {
      editor: "links_embed",
      parameters: {},
      addons: [],
    },
  });

  const homepageBlockField = await client.field.find(
    "homepage::content_blocks"
  );
  const validBlockTypes =
    homepageBlockField.validators.richTextBlocks.itemTypes;

  client.field.update(homepageBlockField.id, {
    validators: {
      richTextBlocks: {
        itemTypes: [...validBlockTypes, agendaBlock.id],
      },
    },
  });
};

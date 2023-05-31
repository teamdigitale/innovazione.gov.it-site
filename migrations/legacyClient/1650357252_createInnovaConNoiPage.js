"use strict";
const util = require("util");

module.exports = async (client) => {
  // Copy department subpage model
  const copy = await client.itemType.duplicate("department_subpage");

  // modify copy
  const innovaConNoi = await client.itemType.update(copy.id, {
    name: "Innova con noi",
    apiKey: "innovate_page",
    draftModeActive: true,
    singleton: true,
  });

  // Delete date_shown, menu_general_links, right_column_longer, fieldset 'Metadati'
  const pageFieldsets = await client.fieldsets.all("innovate_page");
  const metadataFieldset = pageFieldsets.find(
    (fieldset) => fieldset.title === "Metadati"
  );
  await client.fieldset.destroy(metadataFieldset.id);
  await client.field.destroy("innovate_page::date_shown");
  await client.field.destroy("innovate_page::menu_general_links");
  await client.field.destroy("innovate_page::right_column_longer");

  // Add menu_label field
  await client.fields.create(innovaConNoi.id, {
    label: "Menu label",
    apiKey: "menu_label",
    fieldType: "string",
    position: 4,
    validators: {
      required: {},
      length: {
        max: 24,
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

  // Update subtitle, slug and seo fields, which should not be localized
  await client.field.update("innovate_page::subtitle", {
    localized: false,
    validators: {
      required: {},
      length: {
        max: 180, // increase max
      },
    },
  });

  // Remove localization
  await client.field.update("innovate_page::title", {
    localized: false,
  });

  await client.field.update("innovate_page::seo", {
    localized: false,
  });

  await client.field.update("innovate_page::slug", {
    localized: false,
  });

  await client.field.update("innovate_page::summary", {
    localized: false,
  });

  await client.field.update("innovate_page::image_cover_description", {
    localized: false,
  });

  await client.field.update("innovate_page::content_blocks", {
    localized: false,
  });
};

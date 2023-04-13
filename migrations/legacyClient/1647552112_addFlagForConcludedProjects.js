"use strict";

module.exports = async (client) => {
  // Find project model
  const projectModel = await client.itemType.find("project");

  // Create fieldset
  const stateFieldset = await client.fieldset.create(projectModel.id, {
    title: "Stato",
    position: 2,
    collapsible: true,
    startCollapsed: false,
  });

  // Add boolean to determine if active or completed
  await client.fields.create(projectModel.id, {
    label: "Progetto concluso",
    fieldset: stateFieldset.id,
    apiKey: "completed",
    fieldType: "boolean",
    validators: {},
    appearance: {
      editor: "boolean",
      parameters: {},
      addons: [],
    },
  });

  // Add text to show in warning message
  await client.fields.create(projectModel.id, {
    label: "Testo di notifica per progetti conclusi",
    fieldset: stateFieldset.id,
    apiKey: "warning_text",
    fieldType: "string",
    validators: {
      length: {
        max: 120,
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

  // Add date of completion
  await client.fields.create(projectModel.id, {
    label: "Data di conclusione del progetto",
    fieldset: stateFieldset.id,
    apiKey: "date_completed",
    fieldType: "date_time",
    hint: "Attenzione: questa è la data che viene usata per l'ordinamento cronologico nel elenco di progetti completati",
    validators: {},
    appearance: {
      editor: "date_time_picker",
      parameters: {},
      addons: [],
    },
  });
};

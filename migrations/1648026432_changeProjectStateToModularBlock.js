"use strict";

module.exports = async (client) => {
  // Create new modular block for project state
  const projectStateBlock = await client.itemTypes.create({
    name: "Stato",
    apiKey: "block_project_state",
    modularBlock: true,
  });

  // Add boolean to determine if active or completed
  await client.fields.create(projectStateBlock.id, {
    label: "Progetto concluso",
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
  await client.fields.create(projectStateBlock.id, {
    label: "Testo di notifica per progetti conclusi",
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
  await client.fields.create(projectStateBlock.id, {
    label: "Data di conclusione del progetto",
    apiKey: "date_completed",
    fieldType: "date_time",
    hint: "Attenzione: questa è la data che viene usata per l'ordinamento cronologico nel elenco di progetti completati",
    validators: {
      required: {},
    },
    appearance: {
      editor: "date_time_picker",
      parameters: {},
      addons: [],
    },
  });

  // Delete old state fields
  await client.field.destroy("project::completed");
  await client.field.destroy("project::warning_text");
  await client.field.destroy("project::date_completed");

  // Find right fieldset to add block to
  const projectFieldsets = await client.fieldsets.all("project");

  const stateFieldset = projectFieldsets.find(
    (fieldset) => fieldset.title === "Stato"
  );

  await client.fieldset.update(stateFieldset.id, {
    title: "Progetto concluso",
  });

  // Add block to project model
  const projectModel = await client.itemType.find("project");
  await client.fields.create(projectModel.id, {
    label: "Stato del Progetto",
    apiKey: "state_block",
    fieldset: stateFieldset.id,
    fieldType: "rich_text",
    validators: {
      size: {
        max: 1,
      },
      richTextBlocks: {
        itemTypes: [projectStateBlock.id],
      },
    },
    appearance: {
      editor: "rich_text",
      parameters: {
        start_collapsed: true,
      },
      addons: [],
    },
  });
};

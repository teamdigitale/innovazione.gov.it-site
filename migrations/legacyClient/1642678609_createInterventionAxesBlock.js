"use strict";

module.exports = async (client) => {
  // Create intervention axes block
  const interventionAxesBlock = await client.itemTypes.create({
    name: "Blocco assi d'intervento",
    apiKey: "block_axes_intervention",
    modularBlock: true,
  });

  // Create pre-title field
  await client.fields.create(interventionAxesBlock.id, {
    label: "Pre titolo",
    apiKey: "pre_title",
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
        heading: false,
      },
      addons: [],
    },
  });

  // Add interventions field
  const interventionBlock = await client.itemType.find("intervention_block");

  await client.fields.create(interventionAxesBlock.id, {
    label: "Interventi",
    apiKey: "interventions",
    fieldType: "rich_text",
    validators: {
      size: {
        max: 2,
      },
      richTextBlocks: {
        itemTypes: [interventionBlock.id],
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

  // Create link field
  const linkInternalModel = await client.itemType.find("link_internal");
  const linkExternalModel = await client.itemType.find("link_external");

  await client.fields.create(interventionAxesBlock.id, {
    label: "Link",
    apiKey: "link",
    fieldType: "link",
    validators: {
      itemItemType: {
        itemTypes: [linkInternalModel.id, linkExternalModel.id],
      },
    },
    appearance: {
      editor: "link_select",
      parameters: {},
      addons: [],
    },
  });
};

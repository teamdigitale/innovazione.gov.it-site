"use strict";

module.exports = async (client) => {
  // Create block
  const bannerCtaBlock = await client.itemTypes.create({
    name: "Banner Alta con CTA",
    apiKey: "block_banner_with_cta",
    modularBlock: true,
  });

  // Add description
  await client.fields.create(bannerCtaBlock.id, {
    label: "Descrizione",
    apiKey: "description",
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

  // Add link
  const externalLinkModel = await client.itemType.find("link_external");
  const internalLinkModel = await client.itemType.find("link_internal");

  await client.fields.create(bannerCtaBlock.id, {
    label: "Link",
    apiKey: "link",
    fieldType: "link",
    validators: {
      required: {},
      itemItemType: {
        itemTypes: [externalLinkModel.id, internalLinkModel.id],
      },
    },
    appearance: {
      editor: "link_select",
      parameters: {},
      addons: [],
    },
  });
};

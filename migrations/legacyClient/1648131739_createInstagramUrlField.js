"use strict";

module.exports = async (client) => {
  // Find company model
  const companyModel = await client.itemType.find("company");

  // Find social fieldset
  const companyFieldsets = await client.fieldsets.all("company");

  const socialFieldset = companyFieldsets.find(
    (fieldset) => fieldset.title === "Social"
  );

  // Add field
  await client.fields.create(companyModel.id, {
    label: "Instagram URL",
    apiKey: "instagram_url",
    fieldType: "string",
    fieldset: socialFieldset.id,
    validators: {
      format: {
        predefinedPattern: "url",
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
};

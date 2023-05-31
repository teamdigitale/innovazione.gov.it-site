"use strict";

module.exports = async (client) => {
  // Find video model
  const videoModel = await client.itemType.find("video");

  // Find content fieldset
  const videoFieldsets = await client.fieldsets.all("video");
  const contentFieldset = videoFieldsets.find(
    (fieldset) => fieldset.title === "Contenuto"
  );

  // Add image field to video model under content fieldset
  await client.fields.create(videoModel.id, {
    label: "Immagine di anteprima",
    apiKey: "placeholder_image",
    fieldType: "file",
    fieldset: contentFieldset.id,
    position: 3,
    validators: {
      extension: {
        predefined_list: "image",
      },
      required_alt_title: {
        alt: true,
        title: false,
      },
    },
    appearance: {
      editor: "file",
      parameters: {},
      addons: [],
    },
  });

  // Add boolean to use placeholder image instead of youtube thumbnail
  await client.fields.create(videoModel.id, {
    label: "Usa immagine di anteprima",
    apiKey: "use_placeholder_image",
    fieldType: "boolean",
    fieldset: contentFieldset.id,
    position: 4,
    validators: {},
    appearance: {
      editor: "boolean",
      parameters: {},
      addons: [],
    },
    hint: "Attivando quest'opzione verrà utilizzata l'immagine di anteprima caricata manualmente e non quella da Youtube",
  });
};

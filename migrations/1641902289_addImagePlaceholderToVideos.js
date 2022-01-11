'use strict';

module.exports = async (client) => {
  // Find video model
  const videoModel = await client.itemType.find('video');

  // Find content fieldset
  const videoFieldsets = await client.fieldsets.all('video');
  const contentFieldset = videoFieldsets.find(fieldset => fieldset.title === "Contenuto");

  // Add image field to video model under content fieldset
  const placeholderImgField = await client.fields.create(videoModel.id, {
    label: 'Immagine di anteprima',
    apiKey: 'placeholder_image',
    fieldType: 'file',
    fieldset: contentFieldset.id,
    position: 3,
    validators: {
      extension: {
        predefined_list: 'image',
      },
      required_alt_title: {
        alt: true,
        title: false
      },
    },
    appearance: {
      editor: 'file',
      parameters: {},
      addons: [],
    },
  });

  // Add boolean to use placeholder image instead of youtube thumbnail
  const usePlaceholderImgField = await client.fields.create(videoModel.id, {
    label: 'Usare immagine di anteprima',
    apiKey: 'use_placeholder_image',
    fieldType: 'boolean',
    fieldset: contentFieldset.id,
    position: 4,
    validators: {},
    appearance: {
      editor: 'boolean',
      parameters: {},
      addons: [],
    },
    hint: 'Usare imagine di anteprima invece della thumbnail caricata automaticamente da Youtube'
  });
}

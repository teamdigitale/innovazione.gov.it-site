'use strict';

module.exports = async (client) => {
  const videoBlock = await client.itemType.find('block_video');

  const bigField = await client.fields.create(videoBlock.id, {
    label: 'Grande?',
    apiKey: 'big',
    fieldType: 'boolean',
    validators: {},
    appearance: {
      editor: 'boolean',
      parameters: {},
      addons: [],
    },
    hint: 'Questo campo è per blocchi da inserire tra i contenuti dei modelli editoriali (e.g. articoli, communicati stampa, ecc.)',
  });
}

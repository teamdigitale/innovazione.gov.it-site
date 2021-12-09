'use strict';

module.exports = async (client) => {
  const focusBlock = await client.itemTypes.create({
    name: 'Blocco Focus',
    apiKey: 'focus_block',
    modularBlock: true,
  });

  const focusModel = await client.itemType.find('focus_page');

  const focusField = await client.fields.create(focusBlock.id, {
    label: 'Elemento Focus',
    apiKey: 'focus_element',
    fieldType: 'links',
    validators: {
      size: {
        max: 2
      },
      itemsItemType: {
        item_types: [
          focusModel.id
        ]
      }
    },
    appearance: {
      editor: 'links_embed',
      parameters: {},
      addons: [],
    },
  });
}

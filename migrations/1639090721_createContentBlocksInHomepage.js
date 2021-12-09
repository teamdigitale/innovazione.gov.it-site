'use strict';

module.exports = async (client) => {
  const focusBlock = await client.itemType.find('focus_block');
  const Italia2026Block = await client.itemType.find('italy2026_block');
  const ministerBlock = await client.itemType.find('minister_block');
  const homepageModel = await client.itemType.find('homepage');

  const homepageBlockField = await client.fields.create(homepageModel.id, {
    label: 'Contenuti',
    apiKey: 'content_blocks',
    fieldType: 'rich_text',
    validators: {
      richTextBlocks: {
        itemTypes: [
          focusBlock.id,
          Italia2026Block.id,
          ministerBlock.id
        ]
      }
    },
    appearance: {
      editor: 'rich_text',
      parameters: {
        start_collapsed: true
      },
      addons: [],
    },
  });
}

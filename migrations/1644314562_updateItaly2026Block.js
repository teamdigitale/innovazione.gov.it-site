'use strict';

module.exports = async (client) => {
  // Update name of italy 2026 block
  const italy2026Block = await client.itemType.find('block_italy2026');

  client.itemType.update(italy2026Block.id, {
    name: 'Blocco Italia 2026',
    apiKey: 'block_italy2026',
    modularBlock: true,
  });
}

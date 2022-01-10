'use strict';

module.exports = async (client) => {
  const field = await client.field.destroy('block_video_content::big');
  const otherField = await client.field.destroy('block_video_single::big');
}

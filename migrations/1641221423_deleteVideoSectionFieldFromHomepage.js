'use strict';

module.exports = async (client) => {
  const field = await client.field.destroy('homepage::video_section');
  console.log(field);
}

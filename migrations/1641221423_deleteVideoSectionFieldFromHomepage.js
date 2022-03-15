"use strict";

module.exports = async (client) => {
  await client.field.destroy("homepage::video_section");
};

"use strict";

module.exports = async (client) => {
  await client.field.destroy("minister_page::show_schedule");
};

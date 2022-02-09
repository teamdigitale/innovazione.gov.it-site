'use strict';

module.exports = async (client) => {
  const field = await client.field.destroy('minister_page::show_schedule');
}

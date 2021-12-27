'use strict';

module.exports = async (client) => {
  const field = await client.field.destroy('schedule_event::agenda_date');
  console.log(field);
}

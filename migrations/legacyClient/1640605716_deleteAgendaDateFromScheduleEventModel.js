"use strict";

module.exports = async (client) => {
  await client.field.destroy("schedule_event::agenda_date");
};

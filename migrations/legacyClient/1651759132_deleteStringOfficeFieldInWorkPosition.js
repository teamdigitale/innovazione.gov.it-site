"use strict";

module.exports = async (client) => {
  const officeStrField = await client.field.find("work_position::office");
  await client.field.destroy(officeStrField.id);
};

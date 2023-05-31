"use strict";

module.exports = async (client) => {
  await client.itemType.destroy("job_position");
  await client.itemType.destroy("job_positions_index");
  await client.itemType.destroy("pnrr_job_position");
  await client.itemType.destroy("pnrr_job_positions_index");
};

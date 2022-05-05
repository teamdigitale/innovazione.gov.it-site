"use strict";
const util = require("util");

module.exports = async (client) => {
  // Get all records for PNRR work_position
  const pnrrPositionRecords = await client.items.all({
    filter: {
      type: "work_position",
      fields: {
        office: {
          eq: "PNRR",
        },
      },
    },
    version: "current",
    allPages: true,
  });

  // Get all records for department work_position
  const departmentPositionRecords = await client.items.all({
    filter: {
      type: "work_position",
      fields: {
        office: {
          eq: "Dipartimento per la trasformazione digitale",
        },
      },
    },
    version: "current",
    allPages: true,
  });

  // Find record for office link to PNRR office
  const [pnrrOffice] = await client.items.all({
    filter: {
      type: "office",
      fields: {
        name: {
          eq: "PNRR",
        },
      },
    },
  });

  // Find record for office link to department office
  const [deptOffice] = await client.items.all({
    filter: {
      type: "office",
      fields: {
        name: {
          eq: "Dipartimento per la trasformazione digitale",
        },
      },
    },
  });

  pnrrPositionRecords.forEach(async (position) => {
    await client.items.update(position.id, {
      officeLink: pnrrOffice.id,
    });
  });

  departmentPositionRecords.forEach(async (position) => {
    await client.items.update(position.id, {
      officeLink: deptOffice.id,
    });
  });
};

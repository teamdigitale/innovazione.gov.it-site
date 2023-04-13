"use strict";

module.exports = async (client) => {
  // List all menu items
  const menuItems = await client.menuItems.all();

  // Find parent menu item
  const projectsMenuItem = menuItems.find((item) => item.label === "Progetti");

  // Find completed projects index model
  const completedProjects = await client.itemType.find(
    "completed_projects_index"
  );

  // Find and update menu item for completed projects index model
  const completedProjectsMenuItem = menuItems.find(
    (item) => item.label === "Progetti conclusi"
  );

  await client.menuItem.update(completedProjectsMenuItem.id, {
    label: "Progetti conclusi",
    position: 0,
    itemType: completedProjects.id,
    parent: projectsMenuItem.id,
  });
};

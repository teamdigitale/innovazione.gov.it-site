"use strict";

module.exports = async (client) => {
  // List all menu items
  const menuItems = await client.menuItems.all();

  // Find parent menu item
  const homepageMenuItem = menuItems.find((item) => item.label === "Homepage");
  // Find menu item for video index model
  const videosIndexModel = await client.itemType.find("videos_index");

  // Find and update menu item for videos index model
  const videosIndexMenuItem = menuItems.find(
    (item) => item.label === "Indice Video"
  );

  await client.menuItem.update(videosIndexMenuItem.id, {
    label: "Indice Video",
    position: 0,
    itemType: videosIndexModel.id,
    parent: homepageMenuItem.id,
  });

  // Find menu item for video model
  const videoModel = await client.itemType.find("video");

  // Find and update menu item for videos index model
  const videoMenuItem = menuItems.find((item) => item.label === "Video");

  await client.menuItem.update(videoMenuItem.id, {
    label: "Video",
    position: 0,
    itemType: videoModel.id,
    parent: homepageMenuItem.id,
  });
};

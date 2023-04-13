"use strict";

module.exports = async (client) => {
  const linkField = await client.field.find("link_internal::link");
  const italy2026Page = await client.itemType.find("italy2026_page");
  const italy2026Subpage = await client.itemType.find("italy2026_subpage");
  const italy2026ArtIndex = await client.itemType.find(
    "italy2026_articles_index"
  );
  const italy2026AnnIndex = await client.itemType.find(
    "italy2026_announcements_index"
  );
  const italy2026PrIndex = await client.itemType.find(
    "italy2026_press_releases_index"
  );

  const validItemTypes = linkField.validators.itemItemType.itemTypes;

  client.field.update(linkField.id, {
    validators: {
      required: {},
      itemItemType: {
        itemTypes: [
          ...validItemTypes,
          italy2026Page.id,
          italy2026Subpage.id,
          italy2026ArtIndex.id,
          italy2026AnnIndex.id,
          italy2026PrIndex.id,
        ],
      },
    },
  });
};

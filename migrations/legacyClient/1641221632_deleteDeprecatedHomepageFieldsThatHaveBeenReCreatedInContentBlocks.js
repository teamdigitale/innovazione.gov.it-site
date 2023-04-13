"use strict";

module.exports = async (client) => {
  // Delete video fieldset from homepage
  const homepageFieldsets = await client.fieldsets.all("homepage");
  const videoFieldset = homepageFieldsets.find(
    (fieldset) => fieldset.title === "Videos"
  );
  const fieldset = await client.fieldset.destroy(videoFieldset.id);

  // Delete first flag fields that were replaced by content blocks
  const firstFlagShow = await client.field.destroy("homepage::firstflag_show");
  const firstFlagBlocks = await client.field.destroy(
    "homepage::block_first_flags"
  );

  // Delete fieldset that grouped first flag fields that are now deleted
  const deprecatedFirstFlagFieldset = homepageFieldsets.find(
    (fieldset) => fieldset.title === "Bandiera principale (deprecato)"
  );
  await client.fieldset.destroy(deprecatedFirstFlagFieldset.id);

  // Delete Italia2026 fields that were replaced by content blocks
  const italy2026Show = await client.field.destroy("homepage::italy2026_show");
  const italy2026PreTitle = await client.field.destroy(
    "homepage::italy2026_pre_title"
  );
  const italy2026Title = await client.field.destroy(
    "homepage::italy2026_title"
  );
  const italy2026Text = await client.field.destroy("homepage::italy2026_text");
  const italy2026Thumbnail = await client.field.destroy(
    "homepage::italy2026_thumbnail"
  );
  const italy2026Link = await client.field.destroy("homepage::italy2026_link");
  const italy2026Numbers = await client.field.destroy(
    "homepage::italy2026_percent_numbers"
  );
  await client.field.destroy("homepage::focus_elements");

  // Delete fieldset that grouped Italia20206 fields that are now deleted
  const deprecatedItaly2026Fieldset = homepageFieldsets.find(
    (fieldset) => fieldset.title === "Italia 2026 (deprecato)"
  );
  await client.fieldset.destroy(deprecatedItaly2026Fieldset.id);

  // Delete minister fields that were replaced by content blocks
  const ministerPreTitle = await client.field.destroy(
    "homepage::minister_pre_title"
  );
  const ministerTitle = await client.field.destroy("homepage::minister_title");
  const ministerText = await client.field.destroy("homepage::minister_text");
  const ministerNews = await client.field.destroy(
    "homepage::minister_featured_news"
  );
  const showAgenda = await client.field.destroy("homepage::show_schedule");

  // Delete fieldset that grouped minister fields that are now deleted
  const deprecatedMinisterFieldset = homepageFieldsets.find(
    (fieldset) => fieldset.title === "Ministro (deprecato)"
  );
  await client.fieldset.destroy(deprecatedMinisterFieldset.id);
};

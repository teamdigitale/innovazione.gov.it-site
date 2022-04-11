"use strict";

module.exports = async (client) => {
  // Retrieve company record
  const companyContents = await client.items.all({
    filter: {
      type: "company",
    },
  });
  const companyContent = companyContents[0];
  const companyRecordId = companyContent.id;

  // Update record
  await client.items.update(companyRecordId, {
    youtubeUrl:
      "https://www.youtube.com/c/DipartimentoperlaTrasformazioneDigitale",
    instagramUrl: "https://www.instagram.com/dip_trasformazione_digitale",
  });
};

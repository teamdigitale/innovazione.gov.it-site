// Change active title in dropdown menu when a calendar is clicked in the calendars block of Italy2026 page

$(".click-tab").click(function (event) {
  const value = $(this).text();
  $("#active-calendar").text(value);
});

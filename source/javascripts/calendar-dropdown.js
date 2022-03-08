// Change active title in dropdown menu when a calendar is clicked in the calendars block of Italy2026 page and hide from dropdown the option shown in title

$(".click-tab").click(function (event) {
  //$(".click-tab")
  //  .not(".chosen")
  //  .each(function (index, el) {
  //    $(this).show();
  //  });
  //$(".chosen").removeClass(".chosen");
  const value = $(this).text();
  $("#active-calendar").text(value);
  //$(this).addClass(".chosen");
  //$(this).hide();
});

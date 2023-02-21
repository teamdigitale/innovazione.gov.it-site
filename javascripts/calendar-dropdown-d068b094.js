// Change active title in dropdown menu when a calendar is clicked in the calendars block of Italy2026 page

[].forEach.call(document.querySelectorAll("a.click-tab"), function (t) {
  t.addEventListener(
    "click",
    function () {
      const titleToShow = t.innerHTML;
      document.getElementById("active-calendar").innerHTML = titleToShow;
    },
    false
  );
});

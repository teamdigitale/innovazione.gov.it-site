$(function () {
    let parallax = document.querySelectorAll(".innovation-section-head, .hero-head"),
        speed = 0.5;

    window.onscroll = function () {
        // if ratio is smaller than 16:9 image scroll is not behaving correctly
        if (window.innerWidth/window.innerHeight >  1.77) {
            [].slice.call(parallax).forEach(function (element) {
                let windowYOffset = window.pageYOffset,
                    backgroundPositionY = windowYOffset * 0.5;
                element.style.backgroundPositionY = "-" + backgroundPositionY + "px";
            });
        }
    };

    function isEmail(email) {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
    }

    function onFieldsChange() {
        // Enables submit button when at least one option is selected and the input field is filled with an actual email
        $(".js-newsletter-submit")
            .prop("disabled", !isEmail($(".js-newsletter-email").val()));
    }
    $(".js-newsletter-email")
        .on("input", onFieldsChange);

    // obtain "the monday" of a Date
    function getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
          diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      var monday = new Date(d.setDate(diff));
      var options = {year: 'numeric', month: '2-digit', day: '2-digit'};
      return monday.toLocaleDateString("it", options);
    }

    // monday for project-page (dashboards)
    $('#getmonday').text( getMonday(new Date()) );

});

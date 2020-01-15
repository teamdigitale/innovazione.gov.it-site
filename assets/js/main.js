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

    //$('.card').fitVids();

    // Manifesto
    var $accordion = $(".js-accordion");
    var $allPanels = $(" .js-accordion-panel");
    var $allItems = $(".js-accordion-item");

    $accordion.on("click", ".js-accordion-toggle", function() {
        $allPanels.slideUp();
        $allItems.removeClass("is-open");
        if ($(this).next().is(":visible")) {
            $(".js-accordion-panel").slideUp();
        } else {
            $(this).next().slideDown().closest(".js-accordion-item").addClass("is-open");
        }
        return false;
    });

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

});

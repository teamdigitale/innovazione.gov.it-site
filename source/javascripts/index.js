import Swiper from "swiper/bundle";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-select/js/bootstrap-select.js";
import "bootstrap-italia/src/js/plugins/dropdown";
import "bootstrap-italia/src/js/plugins/navbar-collapsible";
import "calendar-swiper.js";
import "calendar-dropdown.js";
import "sticky-header-custom.js";
import "lazysizes";
import "lazysizes/plugins/respimg/ls.respimg";
import "focus-visible/src/focus-visible.js";
import Sharer from "sharer.js/sharer.js";
const progressIndicator = require("progress-indicator.js");
const DatoCmsSearch = require("datocms-search.widget.js");

if ($(".swiper-container").length > 0) {
  //some-slider-wrap-in
  let swiperInstances = [];
  $(".swiper-container").each(function (index, element) {
    //some-slider-wrap-in
    const $this = $(this);
    $this.addClass("instance-" + index); //instance need to be unique
    $this
      .parent()
      .find(".swiper-pagination")
      .addClass("pagination-" + index);
    swiperInstances[index] = new Swiper(".instance-" + index, {
      //instance need to be unique (ex: some-slider)
      preloadImages: false,
      lazy: true,
      pagination: {
        el: ".pagination-" + index,
        type: "bullets",
        clickable: true,
      },
      a11y: {
        enabled: true,
        prevSlideMessage: "Slide precedente",
        nextSlideMessage: "Slide successiva",
        firstSlideMessage: "Questa è la prima slide",
        lastSlideMessage: "Questa è l'ultima slide",
        paginationBulletMessage: "Vai alla slide {{index}}",
      },
    });
  });
}

const searchClient = new DatoCmsSearch(
  "7bc02ea800b5526cd655912c1b6cfa",
  "production"
);

const initSearch = () => {
  if (searchClient === null) {
    return null;
  }
  return searchClient.addWidget("#search-container", {
    initialLocale: $("html").attr("lang"),
    initialQuery: "",
  });
};

// Close accordion on click outside
$(document).click(function (e) {
  var container = $(".collapse");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.collapse("hide");
  }
});

$(".nav-item").click(function (e) {
  $(".collapse").collapse("hide");
});

initSearch();
progressIndicator.updateProgress();
window.onscroll = function () {
  progressIndicator.updateProgress();
};

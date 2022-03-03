import Swiper from "swiper/bundle";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-select/js/bootstrap-select.js";
import "bootstrap-italia/src/js/plugins/dropdown";
import "bootstrap-italia/src/js/plugins/navbar";
import "sticky-header-custom.js";
import "lazysizes";
import "lazysizes/plugins/respimg/ls.respimg";
import "focus-visible/src/focus-visible.js";
import Sharer from "sharer.js/sharer.js";
import "core-js/features/promise";
import "core-js/features/object/assign";
import "core-js/features/string/repeat";
import "core-js/features/number";
import svg4everybody from "svg4everybody";
const progressIndicator = require("progress-indicator.js");
const DatoCmsSearch = require("datocms-search.widget.js");

if ($(".swiper-container").length > 0) {
  //some-slider-wrap-in
  let swiperInstances = [];
  $(".swiper-container").each(function (index, element) {
    //some-slider-wrap-in
    const $this = $(this);
    $this.addClass("instance-" + index); //instance need to be unique (ex: some-slider)
    $this
      .parent()
      .find(".swiper-pagination")
      .addClass("pagination-" + index);
    $this
      .parent()
      .find(".swiper-button-prev")
      .addClass("prev-" + index); //prev must be unique (ex: some-slider-prev)
    $this
      .parent()
      .find(".swiper-button-next")
      .addClass("next-" + index); //next must be unique (ex: some-slider-next)
    swiperInstances[index] = new Swiper(".instance-" + index, {
      //instance need to be unique (ex: some-slider)
      // your settings ...
      preloadImages: false,
      lazy: true,
      navigation: {
        prevEl: ".prev-" + index, //prev must be unique (ex: some-slider-prev)
        nextEl: ".next-" + index, //next must be unique (ex: some-slider-next)
      },
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

  //or all of them
  setTimeout(function () {
    for (const slider of swiperInstances) {
      slider.update();
    }
  }, 50);
}

$(".click-tab").click(function (event) {
  const value = $(this).text();
  $("#active-calendar").text(value);
});

let swiper_num = $(".click-tab").length;
[...Array(swiper_num).keys()].forEach(function (n) {
  const element = $("#swiper-calendar-#{n}");
  element.addClass("instance-" + n); //instance need to be unique (ex: some-slider)
  element
    .parent()
    .find(".swiper-pagination")
    .addClass("pagination-" + n);
  element
    .parent()
    .find(".swiper-button-prev")
    .addClass("prev-" + n); //prev must be unique (ex: some-slider-prev)
  element
    .parent()
    .find(".swiper-button-next")
    .addClass("next-" + n); //next must be unique (ex: some-slider-next)
  const swiper = new Swiper(".instance-" + n, {
    preloadImages: false,
    lazy: true,
    slidesPerView: 4,
    spaceBetween: 30,
    slidesPerGroup: 4,
    navigation: {
      prevEl: ".prev-" + index, //prev must be unique (ex: some-slider-prev)
      nextEl: ".next-" + index, //next must be unique (ex: some-slider-next)
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

//if ($(".swiper-calendar").length > 0) {
//  //some-slider-wrap-in
//  let swiperInstances = [];
//  let swiper_num = $(".click-tab").length;
//
//  $(".swiper-calendar-").each(function (index, element) {
//    //some-slider-wrap-in
//    const $this = $(this);
//    $this.addClass("instance-" + index); //instance need to be unique (ex: some-slider)
//    console.log(index);
//    $this
//      .parent()
//      .find(".swiper-pagination")
//      .addClass("pagination-" + index);
//    $this
//      .parent()
//      .find(".swiper-button-prev")
//      .addClass("prev-" + index); //prev must be unique (ex: some-slider-prev)
//    $this
//      .parent()
//      .find(".swiper-button-next")
//      .addClass("next-" + index); //next must be unique (ex: some-slider-next)
//    swiperInstances[index] = new Swiper(".instance-" + index, {
//      //instance need to be unique (ex: some-slider)
//      // your settings ...
//      preloadImages: false,
//      lazy: true,
//      slidesPerView: 4,
//      spaceBetween: 30,
//      slidesPerGroup: 4,
//      //navigation: {
//      //  prevEl: ".prev-" + index, //prev must be unique (ex: some-slider-prev)
//      //  nextEl: ".next-" + index, //next must be unique (ex: some-slider-next)
//      //},
//      //pagination: {
//      //  el: ".pagination-" + index,
//      //  type: "bullets",
//      //  clickable: true,
//      //},
//      a11y: {
//        enabled: true,
//        prevSlideMessage: "Slide precedente",
//        nextSlideMessage: "Slide successiva",
//        firstSlideMessage: "Questa è la prima slide",
//        lastSlideMessage: "Questa è l'ultima slide",
//        paginationBulletMessage: "Vai alla slide {{index}}",
//      },
//    });
//  });

//or all of them
//  setTimeout(function () {
//    for (const slider of swiperInstances) {
//      slider.update();
//    }
//  }, 50);
//}

//const calendarSwiper = new Swiper(".calendarSwiper", {
//  slidesPerView: 4,
//  spaceBetween: 30,
//  slidesPerGroup: 4,
//  loop: false,
//  //loopFillGroupWithBlank: true,
//  //pagination: {
//  //  el: ".swiper-pagination",
//  //  clickable: true,
//  //},
//  navigation: {
//    nextEl: ".swiper-button-next",
//    prevEl: ".swiper-button-prev",
//  },
//});

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
svg4everybody();
progressIndicator.updateProgress();
window.onscroll = function () {
  progressIndicator.updateProgress();
};

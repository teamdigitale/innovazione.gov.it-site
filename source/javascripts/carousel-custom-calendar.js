import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide-core.min.css";

import BaseComponent from "../../node_modules/bootstrap/js/src/base-component.js";
import SelectorEngine from "../../node_modules/bootstrap/js/src/dom/selector-engine";
import EventHandler from "../../node_modules/bootstrap/js/src/dom/event-handler";

const NAME = "carousel";
const DATA_KEY = "bs.carousel";
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = ".data-api";

const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;

const SELECTOR_CALENDAR_CUSTOM_CAROUSEL = "[data-calendar-splide]";
//const calendarSliders = document.querySelectorAll(SELECTOR_CALENDAR_CUSTOM_CAROUSEL)
//console.log('calendar sliders: ', calendarSliders)

const CONFIG_DEFAULT = {
  slideFocus: true,
  i18n: {
    prev: "Slide precedente",
    next: "Slide successiva",
    first: "Vai alla prima slide",
    last: "Vai all’ultima slide",
    slideX: "Vai alla slide %s",
    pageX: "Vai a pagina %s",
    play: "Attiva autoplay",
    pause: "Pausa autoplay",
  },
  type: "slide",
  //arrows: true,
  pagination: false,
  omitEnd: true,
  gap: 0,
  padding: { left: 24, right: 24 },
  classes: {
    //arrows:
      //"splide__arrows d-flex justify-content-between splide-arrows-position",
    //arrow: "splide__arrow rounded-circle splide-arrow-custom",
    //prev: "splide__arrow--prev splide-button-prev",
    //next: "splide__arrow--next splide-button-next",
    track: "track_padding",
  },
};

class CarouselCalendar extends BaseComponent {
  constructor(element) {
    super(element);
    this._config = this._getConfig(this._element);
    this._splide = new Splide(this._element, this._config);

    this._init();
  }

  dispose() {
    this._splide.destroy();
    super.dispose();
  }
  // Getters

  static get NAME() {
    return NAME;
  }

  // Public

  // Private
  _init() {
    this._splide.mount();
  }

  _getConfig(element) {
    let conf = Object.assign({}, CONFIG_DEFAULT);
    let initialSlideIndex = parseInt(element.dataset.initial);
    let slides = parseInt(element.dataset.slides);
    const fixedSlidesPerView = parseInt(element.dataset.fixed);
    let slidesNumber = null;
    if (fixedSlidesPerView > 0) {
      slidesNumber = fixedSlidesPerView;
    } else if (slides < 4) {
      slidesNumber = slides;
    } else {
      slidesNumber = 4;
    }
    const customConfig = {
      start: initialSlideIndex,
      mediaQuery: "min",
      breakpoints: {
        992: {
          perPage: slidesNumber,
          gap: 0,
          padding: { left: 50, right: 50 },
        },
        768: {
          perPage: 2,
          gap: 0,
          padding: { left: 0, right: 0 },
        },
        560: {
          perPage: 1,
          gap: 0,
          padding: { left: 24, right: 24 },
        },
      },
    };

    conf = Object.assign({}, conf, customConfig);
    return conf;
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  const carousels = SelectorEngine.find(SELECTOR_CALENDAR_CUSTOM_CAROUSEL);
  carousels.forEach((carousel) => {
    CarouselCalendar.getOrCreateInstance(carousel);
  });
});

export default CarouselCalendar;

//for (let i = 0; i < calendarSliders.length; i++) {
//  const calendar = calendarSliders[i]
//  const initialSlideIndex = parseInt(calendar.dataset.initial)
//  const slides = parseInt(calendar.dataset.slides)
//  const fixedSlidesPerView = parseInt(calendar.dataset.fixed)
//  let slidesNumber = null;
//  if (fixedSlidesPerView > 0) {
//    slidesNumber = fixedSlidesPerView;
//  } else if (slides < 4) {
//    slidesNumber = slides;
//  } else {
//    slidesNumber = 4;
//  }
//
//  console.log('initial slide: ', initialSlideIndex)
//  console.log('slides number: ', slidesNumber)
//
//  const config = {
//    slideFocus: true,
//    i18n: {
//      prev: "Slide precedente",
//      next: "Slide successiva",
//      first: "Vai alla prima slide",
//      last: "Vai all’ultima slide",
//      slideX: "Vai alla slide %s",
//      pageX: "Vai a pagina %s",
//      play: "Attiva autoplay",
//      pause: "Pausa autoplay",
//    },
//    type: "slide",
//    arrows: true,
//    perPage: slidesNumber,
//    gap: 0,
//    padding: { left: 0, right: 0 },
//    start: initialSlideIndex,
//    //omitEnd: true,
//    //pagination: false,
//    breakpoints: {
//      560: {
//        perPage: 1,
//        gap: 0,
//        padding: { left: 24, right: 24 },
//      },
//      768: {
//        perPage: 2,
//        gap: 0,
//        padding: { left: 0, right: 0 },
//      },
//      992: {
//        perPage: slidesNumber,
//        gap: 0,
//        padding: { left: 0, right: 0 },
//      },
//    },
//    classes: {
//      pagination: 'splide__pagination__page',
//    //  arrows: "splide__arrows",
//    //  arrow: "splide__arrow",
//    //  prev: "splide__arrow--prev splide-button-prev",
//    //  next: "splide__arrow--next splide-button-next",
//    },
//    arrowPath:
//      "M19.56,2.73l-.11.15a2.07,2.07,0,0,0,.25,2.7L32.6,17.84H2A2.15,2.15,0,0,0,0,20v.17a2.13,2.13,0,0,0,2.11,2H32.6L19.7,34.42l-.14.15a2.09,2.09,0,0,0,.14,2.85,2.15,2.15,0,0,0,1.46.58,2.07,2.07,0,0,0,1.46-.6L39.36,21.5l.14-.15a2.08,2.08,0,0,0-.13-2.85L22.61,2.58l-.15-.13L22.4,2.4a2.13,2.13,0,0,0-2.7.18Z",
//  };
//  new Splide(calendar, config).mount();
//}

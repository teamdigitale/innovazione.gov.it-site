import Swiper from "swiper/bundle";

const swiperInstances = [];

if ($(".swiper-container-calendar").length > 0) {
  //some-slider-wrap-in
  //let swiperInstances = [];
  $(".swiper-container-calendar").each(function (index, element) {
    //some-slider-wrap-in
    const $this = $(this);
    const slides = parseInt($this.data("slides"));
    const fixed_slides_per_view = parseInt($this.data("fixed"));

    let slidesNumber = null;
    if (fixed_slides_per_view > 0) {
      slidesNumber = fixed_slides_per_view;
    } else if (slides < 4) {
      slidesNumber = slides;
    } else {
      slidesNumber = 4;
    }

    const initialSlideIndex = parseInt($this.data("initial"));
    $this.addClass("calendar-instance-" + index); //instance need to be unique

    // init calendars
    swiperInstances[index] = new Swiper(".calendar-instance-" + index, {
      //instance needs to be unique (ex: some-slider)
      observer: true,
      observeParents: true,
      preloadImages: false,
      lazy: true,
      spaceBetween: 0,
      initialSlide: initialSlideIndex,
      breakpoints: {
        // medium is 768 and large is 992
        992: {
          slidesPerView: slidesNumber,
        },
      },
      runCallbacksOnInit: true,
      navigation: {
        prevEl: ".prev-" + index, //prev must be unique
        nextEl: ".next-" + index, //next must be unique
      },
      a11y: {
        enabled: true,
        prevSlideMessage: "Slide precedente",
        nextSlideMessage: "Slide successiva",
        firstSlideMessage: "Questa è la prima slide",
        lastSlideMessage: "Questa è l'ultima slide",
      },
      on: {
        init: function () {
          let container = this.el;
          let totalSlides = parseInt(container.dataset.slides);
          let fixedSlides = parseInt(container.dataset.fixed);
          let max = fixedSlides > 0 ? fixedSlides : 4;
          let initialSlideIndex = parseInt(container.dataset.initial);
          let initialSlideIsLast = initialSlideIndex === totalSlides - 1;

          if (initialSlideIndex === 0 && totalSlides > max) {
            container.classList.add("_mid-fade-out", "_mid-mobile-fade-out");
          } else if (totalSlides > max && initialSlideIsLast) {
            container.classList.add("_mid-mobile-fade-in");
          } else if (
            totalSlides > max &&
            totalSlides - initialSlideIndex <= max
          ) {
            container.classList.add(
              "_mid-fade-in",
              "_mid-mobile-faded-calendar"
            );
          } else if (totalSlides > max) {
            container.classList.add(
              "_mid-faded-calendar",
              "_mid-mobile-faded-calendar"
            );
          } else if (initialSlideIndex === 0) {
            container.classList.add("_mid-mobile-fade-out");
          } else if (initialSlideIsLast) {
            container.classList.add("_mid-mobile-fade-in");
          } else {
            container.classList.add("_mid-mobile-faded-calendar");
          }
        },
      },
    });
  });
}

swiperInstances.forEach(function (swiper, index) {
  const container = swiper.el;

  swiper.on("reachEnd", function () {
    if (!swiper.isBeginning) {
      container.classList.remove(
        "_mid-faded-calendar",
        "_mid-mobile-faded-calendar",
        "_mid-fade-out",
        "_mid-mobile-fade-out"
      );
      container.classList.add("_mid-fade-in", "_mid-mobile-fade-in");
    }
  });

  swiper.on("fromEdge", function () {
    if (!(swiper.isBeginning || swiper.isEnd)) {
      container.classList.remove(
        "_mid-fade-in",
        "_mid-mobile-fade-in",
        "_mid-fade-out",
        "_mid-mobile-fade-out"
      );
      container.classList.add(
        "_mid-faded-calendar",
        "_mid-mobile-faded-calendar"
      );
    }
  });

  swiper.on("reachBeginning", function () {
    if (!swiper.isEnd) {
      container.classList.remove(
        "_mid-faded-calendar",
        "_mid-mobile-faded-calendar",
        "_mid-fade-in",
        "_mid-mobile-fade-in"
      );
      container.classList.add("_mid-fade-out", "_mid-mobile-fade-out");
    }
  });
});

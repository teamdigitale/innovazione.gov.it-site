import Swiper from "swiper/bundle";

if ($(".swiper-container-calendar").length > 0) {
  //some-slider-wrap-in
  let swiperInstances = [];
  $(".swiper-container-calendar").each(function (index, element) {
    //some-slider-wrap-in
    const $this = $(this);
    const slides = $this.data("slides");
    const slidesNumber = slides < 4 ? slides : 4;
    const initial_slide_index = $this.data("initial");
    $this.addClass("calendar-instance-" + index); //instance need to be unique

    // Remove fading effect where needed based on active slide
    if (slides > 4) {
      $this.addClass("_mid-faded-calendar");
    }

    // init calendars
    swiperInstances[index] = new Swiper(".calendar-instance-" + index, {
      //instance needs to be unique (ex: some-slider)
      observer: true,
      observeParents: true,
      preloadImages: false,
      lazy: true,
      spaceBetween: 0,
      initialSlide: initial_slide_index,
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
    });
  });
}

$(".swiper-container-calendar").each(function (index, el) {
  if ($(this).hasClass(`calendar-instance-${index}`)) {
    $(`.prev-${index}`).click(function (e) {
      const $activeEl = $(`.calendar-instance-${index}`)
        .children()
        .find(".swiper-slide-active");
      const activeLabel = $activeEl.attr("aria-label");

      if (typeof activeLabel !== "undefined") {
        const slideMatch = activeLabel.match(/^(\d*)\s\/\s(\d*)/);
        const activeSlide = parseInt(slideMatch[1]);
        const totalSlides = parseInt(slideMatch[2]);
        const firstSlideActive = activeSlide === 1;
        const lastSlideShown = activeSlide === totalSlides - 3;

        if (firstSlideActive) {
          $(`.swiper-container-calendar.calendar-instance-${index}`)
            .removeClass("_mid-faded-calendar")
            .addClass("_mid-fade-out");
        } else if (!lastSlideShown) {
          $(`.swiper-container-calendar.calendar-instance-${index}`)
            .removeClass("_mid-fade-in")
            .removeClass("_mid-fade-out")
            .addClass("_mid-faded-calendar");
        }
      }
    });

    $(`.next-${index}`).click(function (e) {
      const $activeEl = $(`.calendar-instance-${index}`)
        .children()
        .find(".swiper-slide-active");
      const activeLabel = $activeEl.attr("aria-label");

      if (typeof activeLabel !== "undefined") {
        const slideMatch = activeLabel.match(/^(\d*)\s\/\s(\d*)/);
        const activeSlide = parseInt(slideMatch[1]);
        const totalSlides = parseInt(slideMatch[2]);
        const firstSlideActive = activeSlide === 1;
        const lastSlideShown = activeSlide === totalSlides - 3;

        if (lastSlideShown) {
          $(`.swiper-container-calendar.calendar-instance-${index}`)
            .removeClass("_mid-faded-calendar")
            .removeClass("_mid-fade-out")
            .addClass("_mid-fade-in");
        } else if (!firstSlideActive) {
          $(`.swiper-container-calendar.calendar-instance-${index}`)
            .removeClass("_mid-fade-in")
            .removeClass("_mid-fade-out")
            .addClass("_mid-faded-calendar");
        }
      }
    });
  }
});

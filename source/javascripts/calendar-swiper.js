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
    console.log("initial slide index:");
    console.log(initial_slide_index);
    $this.addClass("calendar-instance-" + index); //instance need to be unique
    $this
      .parent()
      .find(".swiper-button-prev")
      .addClass("prev-" + index); //prev must be unique
    $this
      .parent()
      .find(".swiper-button-next")
      .addClass("next-" + index); //next must be unique
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

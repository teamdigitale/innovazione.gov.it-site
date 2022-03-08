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
      observer: true,
      observeParents: true,
      parallax: true,
      preloadImages: false,
      lazy: true,
      spaceBetween: 0,
      slidesPerView: 1,
      initialSlide: initial_slide_index,
      //slidesPerGroup: 1,
      breakpoints: {
        // medium is 768 and large is 992
        992: {
          slidesPerView: slidesNumber,
          slidesPerGroup: slidesNumber,
          initialSlide: 0,
        },
      },
      direction: "horizontal",
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

import Swiper from "swiper/bundle";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-select/js/bootstrap-select.js";
import "bootstrap-italia/src/js/plugins/dropdown";
import "bootstrap-italia/src/js/plugins/navbar";
import "lazysizes";

var mySwiper = new Swiper ('.swiper-container', {
  autoplay: {
    delay: 5000,
  },
  init: false,
  speed: 750,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

mySwiper.init()
//@ts-ignore
import Swiper from 'swiper/bundle';
import 'swiper/scss';
import 'swiper/scss/pagination';

export const swiper = new Swiper('.image-slider', {
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },
});

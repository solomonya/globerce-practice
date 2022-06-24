//@ts-ignore
import Swiper from 'swiper/bundle';
import 'swiper/scss';
import 'swiper/scss/pagination';
export default class BannerSlider {
  static init() {
    new Swiper('.banner-slider', {
      loop: true,
      initialSlide: 3,

      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true,
      },
    });
  }
}

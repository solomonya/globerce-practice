import Swiper from 'swiper';
import 'swiper/scss';
import 'swiper/scss/pagination';

export default class ProductSlider {
  public static init() {
    new Swiper('.product-slider', {
      loop: true,
      initialSlide: 3,
      spaceBetween: 12,

      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: true,
      },
    });
  }
}

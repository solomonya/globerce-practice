//@ts-ignore
import Swiper from 'swiper/bundle';
import 'swiper/scss';
import 'swiper/scss/pagination';
var BannerSlider = /** @class */ (function () {
    function BannerSlider() {
    }
    BannerSlider.init = function () {
        new Swiper('.banner-slider', {
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
    };
    return BannerSlider;
}());
export default BannerSlider;

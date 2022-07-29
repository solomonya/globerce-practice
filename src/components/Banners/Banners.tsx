import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import banner from '../../assets/backgrounds/banner.png';
import 'swiper/css';
import 'swiper/css/pagination';
import classes from './banners.module.css';
import axios, { AxiosResponse } from 'axios';
import TBanner from '../../scripts/@types/banners';
import { useInView } from 'react-intersection-observer';

function Banners() {
  const skeletBanners: Array<TBanner> = new Array(7).fill(0).map((el) => {
    return {
      id: Math.floor(Math.random() * 10000),
      media: {
        url: banner,
        altText: 'banner',
      },
    };
  });

  const [banners, setBanners] = React.useState(skeletBanners);

  const updateBanners = async (
    bannersResponse: Promise<AxiosResponse<Array<TBanner>>>
  ) => {
    bannersResponse
      .then((response) => response.data)
      .then((data: Array<TBanner>) => {
        setBanners(data);
      });
  };

  const getBanners = async () => {
    const bannersResponse: AxiosResponse<Array<TBanner>> = await axios.get(
      'http://localhost:3003/banners/'
    );
    return bannersResponse;
  };

  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <div ref={ref}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true, type: 'bullets', dynamicBullets: true }}
        onSwiper={() => {
          console.log(inView);
          updateBanners(getBanners());
        }}
      >
        {banners.map((el) => {
          return (
            <SwiperSlide key={el.id}>
              <img
                className={classes.img}
                src={el.media.url}
                alt={el.media.altText}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banners;

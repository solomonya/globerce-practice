import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import banner from '../../assets/backgrounds/banner.png';
import 'swiper/css';
import 'swiper/css/pagination';
import classes from './banners.module.css';
import axios, { AxiosResponse } from 'axios';
import TBanner from '../../scripts/@types/banners';
import useInView from '../../hooks/useInView';
import { v4 as uuidv4 } from 'uuid';

function Banners() {
  const targetRef = useRef(null);

  const skeletBanners: Array<TBanner> = new Array(7).fill(0).map(() => {
    return {
      id: uuidv4(),
      media: {
        url: banner,
        altText: 'banner',
      },
    };
  });

  const [banners, setBanners] = useState(skeletBanners);

  const updateBanners = async () => {
    const bannersResponse: AxiosResponse<Array<TBanner>> = await axios.get(
      'http://localhost:3003/banners/'
    );
    setBanners(bannersResponse.data);
  };
  const isVisible = useInView(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
    targetRef
  );
  useEffect(() => {
    if (isVisible) updateBanners();
  }, [isVisible]);

  return (
    <div ref={targetRef}>
      <Swiper
        loop={true}
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true, type: 'bullets', dynamicBullets: true }}
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

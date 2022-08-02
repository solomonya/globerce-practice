import React, { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import banner from '../../assets/backgrounds/banner.png';
import 'swiper/css';
import 'swiper/css/pagination';
import axios, { AxiosResponse } from 'axios';
import TBanner from '../../scripts/@types/banners';
import useInView from '../../hooks/useInView';
import { v4 as uuidv4 } from 'uuid';
import Banner from './Banner';

const DEFAULT_SLIDES_AMOUNT: number = 7;

const Banners: FC<{ URL: string }> = ({ URL }) => {
  const targetRef = useRef(null);

  const skeletBanners: Array<TBanner> = new Array(DEFAULT_SLIDES_AMOUNT)
    .fill(0)
    .map(() => {
      return {
        id: uuidv4(),
        media: {
          url: banner,
          altText: 'banner',
        },
      };
    });

  const [banners, setBanners] = useState(skeletBanners);

  const isVisible = useInView(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
    targetRef
  );

  const updateBanners = async () => {
    const bannersResponse: AxiosResponse<Array<TBanner>> = await axios.get(URL);
    setBanners(bannersResponse.data);
  };

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
              <Banner
                alt={el.media.altText}
                src={el.media.url}
                width={375}
                height={175}
              ></Banner>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banners;

import React from 'react';
import { SwiperSlide } from 'swiper/react';
import TBanner from '../../scripts/@types/banners';

function Banner({ id, media }: TBanner) {
  return (
    <SwiperSlide key={id}>
      <img src={media.url} alt={media.altText} />
    </SwiperSlide>
  );
}

export default Banner;

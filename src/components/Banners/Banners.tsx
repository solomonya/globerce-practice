import React, { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { IBanners } from '../../@types/banners';
import classes from './banners.module.css';

const Banners: FC<IBanners> = ({ banners, width, height }) => {
  const styles = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `8px`,
  };

  return (
    <Swiper
      loop={true}
      modules={[Pagination]}
      slidesPerView={1}
      pagination={{ clickable: true, type: 'bullets', dynamicBullets: true }}
    >
      {banners?.map((el) => {
        return (
          <SwiperSlide key={el.id}>
            <div className={classes.container}>
              <a href='#' className={classes.link}>
                <img src={el.media.url} alt={el.media.altText} style={styles} />
              </a>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banners;

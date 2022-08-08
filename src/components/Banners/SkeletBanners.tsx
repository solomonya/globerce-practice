import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import TBanner from '../../@types/banners';
import banner from '../../assets/backgrounds/banner.png';
import classes from './banners.module.css';

const SkeletBanners: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  const skeletBanners: TBanner[] = new Array(7).fill(0).map((el, i) => {
    return {
      id: i.toString(),
      media: {
        url: banner,
        altText: 'skelet banner',
      },
    };
  });

  const styles = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <Swiper
      loop={true}
      modules={[Pagination]}
      slidesPerView={1}
      pagination={{ clickable: true, type: 'bullets', dynamicBullets: true }}
    >
      {skeletBanners.map((el) => {
        return (
          <SwiperSlide key={el.id}>
            <div className={classes.container}>
              <img src={el.media.url} alt={el.media.altText} style={styles} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SkeletBanners;

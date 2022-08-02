import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import banner from '../../assets/backgrounds/banner.png';

const Banner: FC<{
  alt: string;
  src: string;
  width: number;
  height: number;
}> = ({ alt, src, width, height }) => (
  <div>
    <LazyLoadImage
      alt={alt}
      height={height}
      placeholderSrc={banner}
      src={src}
      width={width}
    />
  </div>
);

export default Banner;

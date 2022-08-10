import React, { FC, useRef } from 'react';
import TBanner from '../../../@types/banners';
import { getBannersUrl } from '../../../controllers/api-routes';
import useRequest from '../../../hooks/useRequest';
import classes from './productsSectionBanner.module.css';

const ProductsSectionBanner: FC<{ bannerType: string }> = ({ bannerType }) => {
  const targetRef = useRef(null);
  const { loading, error, data } = useRequest<TBanner>(
    getBannersUrl(bannerType),
    targetRef
  );

  return (
    <img
      className={classes.img}
      ref={targetRef}
      src={data?.media.url}
      alt={data?.media.altText}
    />
  );
};

export default ProductsSectionBanner;

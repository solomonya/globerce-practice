import React, { FC, useRef } from 'react';
import TBanner from '../../@types/banners';
import { getBannersUrl } from '../../controllers/api-routes';
import useRequest from '../../hooks/useRequest';
import ProductsGrid from '../ProductsGrid/ProductsGrid';
import ProductsGridSkeleton from '../ProductsGrid/ProductsGridSkeleton/ProductsGridSkeleton';
import Skeleton from '../Skeleton/Skeleton';
import classes from './productsSection.module.css';

const ProductsSection: FC<{ bannerType: string; productsAmount: number }> = ({
  bannerType,
  productsAmount,
}) => {
  const targetRef = useRef(null);

  const { loading, error, data } = useRequest<TBanner>(
    getBannersUrl(bannerType),
    targetRef
  );

  return (
    <section ref={targetRef} className={classes.section}>
      {(loading || error) && (
        <div style={{ position: 'absolute' }}>
          <Skeleton width={375} height={249} radius={0}></Skeleton>
        </div>
      )}
      {!loading && (
        <img
          src={data?.media.url}
          alt={data?.media.altText}
          className={classes.img}
        />
      )}
      <div className={classes.productsContainer}>
        {(loading || error) && (
          <ProductsGridSkeleton productsAmount={productsAmount} />
        )}
        {!loading && <ProductsGrid productsAmount={productsAmount} />}
      </div>
    </section>
  );
};

export default ProductsSection;

import React, { FC, useRef } from 'react';
import TProduct from '../../@types/product';
import { getProductsUrl } from '../../controllers/api-routes';
import useRequest from '../../hooks/useRequest';
import ProductsGrid from '../ProductsGrid/ProductsGrid';
import ProductsGridSkeleton from '../ProductsGrid/ProductsGridSkeleton/ProductsGridSkeleton';
import Skeleton from '../Skeleton/Skeleton';
import classes from './productsSection.module.css';
import ProductsSectionBanner from './ProductsSectionBanner/ProductsSectionBanner';

const ProductsSection: FC<{ bannerType: string; productsAmount: number }> = ({
  bannerType,
  productsAmount,
}) => {
  const targetRef = useRef(null);

  const { loading, error, data } = useRequest<TProduct[]>(
    getProductsUrl(productsAmount),
    targetRef
  );

  return (
    <section ref={targetRef} className={classes.section}>
      {(loading || error) && (
        <div style={{ position: 'absolute' }}>
          <Skeleton width={375} height={249} radius={0}></Skeleton>
        </div>
      )}
      {!loading && <ProductsSectionBanner bannerType={bannerType} />}
      <div className={classes.productsContainer}>
        {(loading || error) && (
          <ProductsGridSkeleton productsAmount={productsAmount} />
        )}
        {!loading && <ProductsGrid products={data} />}
      </div>
    </section>
  );
};

export default ProductsSection;

import React, { FC, lazy, useRef } from 'react';
import TProduct from '../../@types/product';
import { getProductsUrl } from '../../controllers/api-routes';
import useRequest from '../../hooks/useRequest';
import ProductCard from '../ProductCard/ProductCard';
import classes from './productsGrid.module.css';
import ProductsGridSkeleton from './ProductsGridSkeleton/ProductsGridSkeleton';

const ProductsGrid: FC<{ productsAmount: number }> = ({ productsAmount }) => {
  const targetRef = useRef(null);
  const { loading, error, data } = useRequest<TProduct[]>(
    getProductsUrl(productsAmount),
    targetRef
  );

  return (
    <ul ref={targetRef} className={classes.list}>
      {data?.map((product) => {
        return (
          <li key={product.id}>
            <ProductCard
              size='lg'
              imgUrl={product.imgUrl}
              title={product.title}
              loan={product.loan}
              discount={product.discount}
              reviewsAmount={product.reviewsAmount}
              rating={product.rating}
              actualPrice={product.actualPrice}
              oldPrice={product.oldPrice}
              months={product.months}
              monthPayment={product.monthPayment}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsGrid;

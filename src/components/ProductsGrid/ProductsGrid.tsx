import React, { FC, lazy, useRef } from 'react';
import TProduct from '../../@types/product';
import ProductCard from '../ProductCard/ProductCard';
import classes from './productsGrid.module.css';

const ProductsGrid: FC<{ products: TProduct[] | null }> = ({ products }) => {
  return (
    <ul className={classes.list}>
      {products?.map((product) => {
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

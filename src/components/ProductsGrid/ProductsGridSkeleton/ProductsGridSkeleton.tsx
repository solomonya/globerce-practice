import React, { FC } from 'react';
import ProductCardSkeleton from '../../ProductCard/ProductCardSkeleton/ProductCardSkeleton';
import classes from '../productsGrid.module.css';

const ProductsGridSkeleton: FC<{ productsAmount: number }> = ({
  productsAmount,
}) => {
  const productsGridSkeletons = new Array(productsAmount).fill(0);
  return (
    <ul className={classes.list}>
      {productsGridSkeletons.map((el, index) => {
        return (
          <li className={classes.item} key={index}>
            <ProductCardSkeleton size='lg' />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsGridSkeleton;

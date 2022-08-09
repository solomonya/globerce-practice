import React, { FC } from 'react';
import TProduct from '../../../@types/product';
import ProductCard from '../../ProductCard/ProductCard';
import classes from './recentlyWatchList.module.css';

export const RecentlyWatchList: FC<{
  list: Array<TProduct> | null;
}> = ({ list }) => {
  return (
    <ul className={classes.list}>
      {list?.map((recentlyWatchItem) => {
        return (
          <li key={recentlyWatchItem.id} className={classes.item}>
            <ProductCard
              size='sm'
              imgUrl={recentlyWatchItem.imgUrl}
              title={recentlyWatchItem.title}
              loan={recentlyWatchItem.loan}
              discount={recentlyWatchItem.discount}
              reviewsAmount={recentlyWatchItem.reviewsAmount}
              rating={recentlyWatchItem.rating}
              actualPrice={recentlyWatchItem.actualPrice}
              oldPrice={recentlyWatchItem.oldPrice}
            />
          </li>
        );
      })}
    </ul>
  );
};

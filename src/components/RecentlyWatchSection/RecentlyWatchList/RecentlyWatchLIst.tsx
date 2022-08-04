import React, { FC } from 'react';
import TRecentlyWatchItem from '../../../scripts/@types/recentlyWatchItems';
import ProductCard from '../../ProductCard/ProductCard';
import classes from './recentlyWatchList.module.css';

export const RecentlyWatchList: FC<{
  list: Array<TRecentlyWatchItem>;
}> = ({ list }) => {
  return (
    <ul className={classes.list}>
      {list.map((recentlyWatchItem) => {
        return (
          <li key={recentlyWatchItem.id} className={classes.item}>
            <ProductCard
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

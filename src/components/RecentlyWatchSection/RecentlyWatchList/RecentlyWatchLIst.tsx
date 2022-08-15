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
            <ProductCard size='sm' {...recentlyWatchItem} />
          </li>
        );
      })}
    </ul>
  );
};

import React, { FC } from 'react';
import productPlaceholder from '../../../assets/mocks/product-placeholder.png';
import listClasses from '../RecentlyWatchList/recentlyWatchList.module.css';
import classes from './recentlyWatchSkeleton.module.css';
import { v4 as uuidv4 } from 'uuid';
import Skeleton from '../../Skeleton/Skeleton';
import ProductCardSkeleton from '../../ProductCard/ProductCardSkeleton/ProductCardSkeleton';

const RecentlyWatchSkeleton: FC = () => {
  const skeletonList = new Array(5).fill(0).map(() => {
    return {
      id: uuidv4(),
      imgSrc: productPlaceholder,
    };
  });

  return (
    <ul className={listClasses.list}>
      {skeletonList.map((skeleton) => {
        return (
          <li key={skeleton.id} className={listClasses.item}>
            <ProductCardSkeleton size='sm' />
          </li>
        );
      })}
    </ul>
  );
};

export default RecentlyWatchSkeleton;

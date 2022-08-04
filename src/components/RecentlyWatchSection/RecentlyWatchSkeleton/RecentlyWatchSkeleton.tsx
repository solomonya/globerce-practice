import React, { FC } from 'react';
import productPlaceholder from '../../../assets/mocks/product-placeholder.png';
import listClasses from '../RecentlyWatchList/recentlyWatchList.module.css';
import classes from './recentlyWatchSkeleton.module.css';
import { v4 as uuidv4 } from 'uuid';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
            <div className={classes.card}>
              <img
                src={skeleton.imgSrc}
                alt='product placeholder'
                className={classes.img}
              />
              <Skeleton width={131} height={16} />
              <Skeleton width={105} height={10} />
              <Skeleton width={83} height={16} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RecentlyWatchSkeleton;

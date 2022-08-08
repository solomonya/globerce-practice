import React, { FC } from 'react';
import TCategory from '../../../@types/category';
import { v4 as uuidv4 } from 'uuid';
import saleImg from '../../../assets/mocks/Sale.png';
import classes from '../CategoryGrid/categoryGrid.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

const CategorySkeleton: FC = () => {
  const skeletonCategories: Array<TCategory> = new Array(12).fill(0).map(() => {
    return {
      id: uuidv4(),
      imgSrc: saleImg,
      title: '',
    };
  });

  return (
    <ul className={classes.list}>
      {skeletonCategories.map((categoryCard) => {
        return (
          <li className={classes.item} key={categoryCard.id}>
            <CategoryCard
              title={categoryCard.title}
              imgSrc={categoryCard.imgSrc}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CategorySkeleton;

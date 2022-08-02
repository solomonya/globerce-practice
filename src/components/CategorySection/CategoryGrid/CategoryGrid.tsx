import React, { FC } from 'react';
import TCategory from '../../../scripts/@types/category';
import classes from './categoryGrid.module.css';
import CategoryCard from '../CategoryCard/CategoryCard';

const CategoryGrid: FC<{ categories: Array<TCategory> }> = ({ categories }) => {
  return (
    <ul className={classes.list}>
      {categories.map((categoryCard) => {
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

export default CategoryGrid;

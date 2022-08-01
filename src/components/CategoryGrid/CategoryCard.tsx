import React from 'react';
import TCategory from '../../scripts/@types/category';
import classes from './categoryCard.module.css';

const CategoryCard = ({ imgSrc, title }: TCategory) => {
  return (
    <a className={classes.link} href='#'>
      <img className={classes.img} src={imgSrc} alt='category card'></img>
      <h6 className={classes.title}>{title}</h6>
    </a>
  );
};

export default CategoryCard;

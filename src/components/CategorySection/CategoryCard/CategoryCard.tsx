import React, { FC, ReactNode } from 'react';
import classes from './categoryCard.module.css';

const CategoryCard: FC<{ title: string; imgSrc: string }> = ({
  title,
  imgSrc,
}) => {
  return (
    <a className={classes.link} href='#'>
      <h6 className={classes.title}>{title}</h6>
      <img className={classes.img} src={imgSrc} alt={title} />
    </a>
  );
};

export default CategoryCard;

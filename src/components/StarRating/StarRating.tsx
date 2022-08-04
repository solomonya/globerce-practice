import React, { FC } from 'react';
import classes from './starRating.module.css';
import { v4 as uuidv4 } from 'uuid';

const StarRating: FC<{ rating: number }> = ({ rating }) => {
  const stars = new Array(5).fill(0);
  const percentageRating = rating * 20;
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        {stars.map(() => {
          return (
            <li key={uuidv4()} className={classes.item}>
              <span className={`${classes.greyStar} ${classes.star}`}></span>
            </li>
          );
        })}
      </ul>
      <ul
        className={`${classes.list} ${classes.stars}`}
        style={{ width: `${percentageRating}%` }}
      >
        {stars.map(() => {
          return (
            <li key={uuidv4()} className={classes.item}>
              <span className={`${classes.yellowStar} ${classes.star}`}></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StarRating;

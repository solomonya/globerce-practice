import React, { FC } from 'react';
import StarRating from '../StarRating/StarRating';
import classes from './productCard.module.css';

const ProductCard: FC<{
  imgUrl: string;
  loan: boolean;
  discount: boolean;
  title: string;
  reviewsAmount: number;
  rating: number;
  actualPrice?: number;
  oldPrice: number;
}> = ({
  imgUrl,
  loan,
  discount,
  title,
  reviewsAmount,
  rating,
  actualPrice,
  oldPrice,
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <img src={imgUrl} alt='product' className={classes.img} />
        <div className={classes.installments}>
          {loan && (
            <span className={`${classes.loan} ${classes.plate}`}>0-0-24</span>
          )}
          {discount && (
            <span className={`${classes.discount} ${classes.plate}`}>
              скидка
            </span>
          )}
        </div>
      </div>
      <div className={classes.body}>
        <h6 className={classes.title}>{title}</h6>
        <div className={classes.reviews}>
          <StarRating rating={rating} />
          <span className={classes.reviewsAmount}>{reviewsAmount} отзывов</span>
        </div>
        <div className={classes.prices}>
          <span className={classes.actualPrice}>{actualPrice} ₸</span>
          <span className={classes.oldPrice}>{oldPrice} ₸</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

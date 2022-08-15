import React, { FC } from 'react';
import TProduct from '../../@types/product';
import FavoriteBtn from '../FavoriteBtn/FavoriteBtn';
import StarRating from '../StarRating/StarRating';
import classes from './productCard.module.css';

const ProductCard: FC<TProduct> = ({
  size,
  id,
  imgUrl,
  loan,
  discount,
  title,
  reviewsAmount,
  rating,
  actualPrice,
  oldPrice,
  months,
  monthPayment,
}) => {
  return (
    <div className={size === 'sm' ? classes.card_sm : classes.card_lg}>
      <div className={size === 'sm' ? classes.header_sm : classes.header_lg}>
        <img
          src={imgUrl}
          alt='product'
          className={size === 'sm' ? classes.img_sm : classes.img_lg}
        />
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
        <FavoriteBtn id={id} />
      </div>
      <div className={classes.body}>
        <h6
          className={
            size === 'sm'
              ? `${classes.title} ${classes.title_sm}`
              : `${classes.title} ${classes.title_lg}`
          }
        >
          {title}
        </h6>
        <div className={classes.reviews}>
          <StarRating rating={rating} />
          <span className={classes.reviewsAmount}>{reviewsAmount} отзывов</span>
        </div>
        <div className={classes.prices}>
          <span className={classes.actualPrice}>{actualPrice} ₸</span>
          <span className={classes.oldPrice}>{oldPrice} ₸</span>
        </div>
        {size === 'lg' && (
          <div className={classes.loanPlate}>
            <span className={classes.loanPrice}>{monthPayment}₸</span>
            <span className={classes.loanMonths}>х {months} мес</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

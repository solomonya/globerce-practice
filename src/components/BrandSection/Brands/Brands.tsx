import React, { FC } from 'react';
import TBrand from '../../../@types/brand';
import classes from './brands.module.css';

const Brands: FC<{ brands: TBrand[] | null }> = ({ brands }) => {
  return (
    <div className={classes.container}>
      {brands?.map((brand) => {
        return <img src={brand.imgSrc} alt={brand.altText} key={brand.id} />;
      })}
    </div>
  );
};

export default Brands;

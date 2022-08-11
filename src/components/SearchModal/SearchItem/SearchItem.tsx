import React, { FC } from 'react';
import { TSearchItem } from '../../../@types/search-suggest';
import classes from './searchItem.module.css';

const SearchItem: FC<TSearchItem> = ({ url, title, subtitle, brand }) => {
  return (
    <a href={url} className={classes.link}>
      <h1>{title}</h1>
    </a>
  );
};

export default SearchItem;

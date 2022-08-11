import React, { FC } from 'react';
import CrossBtn from '../CrossBtn/CrossBtn';
import classes from './searchBar.module.css';

const SearchBar: FC = () => {
  return (
    <div className={classes.search}>
      <div className={classes.container}>
        <span className={classes.icon}></span>
        <input
          className={classes.input}
          type='text'
          placeholder='Найти в Globerce Market'
        />
        <CrossBtn className='clear' />
      </div>
      <button className={classes.cancel}>Отменить</button>
    </div>
  );
};

export default SearchBar;

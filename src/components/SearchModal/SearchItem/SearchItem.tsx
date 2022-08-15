import React, { FC } from 'react';
import { TSearchItem } from '../../../@types/search-suggest';
import classes from './searchItem.module.css';
import clockIcon from '../../../assets/icons/clock.svg';
import searchIcon from '../../../assets/icons/search.svg';
import hotIcon from '../../../assets/icons/fair.svg';

const SearchItem: FC<TSearchItem> = ({ url, title, subtitle, brand, type }) => {
  const iconType = `${classes.icon}_${type}`;

  const icons = {
    history: clockIcon,
    search: searchIcon,
    hot: hotIcon,
  };

  const style = {
    background: `url('${icons[type]}') center no-repeat`,
  };

  return (
    <a href={url} className={classes.link}>
      <div className={classes.container}>
        <span className={`${classes.icon} ${iconType}`} style={style}></span>
        <div className={classes.titles}>
          {brand ? (
            <h5 className={classes.title}>{`${title} ${brand}`}</h5>
          ) : (
            <h5 className={classes.title}>{title}</h5>
          )}
          {subtitle && <h6 className={classes.subtitle}>{subtitle}</h6>}
        </div>
      </div>
      {type === 'history' && <button className={classes.deleteBtn} />}
    </a>
  );
};

export default SearchItem;

import React from 'react';
import LocationBtn from '../LocationBtn/LocationBtn';
import classes from './headerLogo.module.css';

function HeaderLogo() {
  return (
    <div className={classes.logo}>
      <span className={classes.icon}></span>
      <LocationBtn position='right' />
    </div>
  );
}

export default HeaderLogo;

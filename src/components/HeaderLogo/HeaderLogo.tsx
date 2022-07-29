import * as React from 'react';
import LocationBtn from '../LocationBtn/LocationBtn';
import classes from './headerLogo.module.css';
import locationBtnClasses from '../LocationBtn/locationBtn.module.css';

function HeaderLogo() {
  return (
    <div className={classes.logo}>
      <span className={classes.icon}></span>
      <LocationBtn position={locationBtnClasses.btnAbsolute}></LocationBtn>
    </div>
  );
}

export default HeaderLogo;

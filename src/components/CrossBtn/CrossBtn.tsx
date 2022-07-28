import * as React from 'react';
import TCrossProps from '../../scripts/@types/crossBtn';
import classes from './crossBtn.module.css';

function CrossBtn(props: TCrossProps) {
  return (
    <button className={`${classes.cross} ${props.className}`}>
      <span className={classes.icon}></span>
    </button>
  );
}

export default CrossBtn;

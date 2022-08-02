import React, { FC } from 'react';
import classes from './crossBtn.module.css';

const CrossBtn: FC<{ className: string }> = ({ className }) => {
  return (
    <button className={`${classes.cross} ${className}`}>
      <span className={classes.icon}></span>
    </button>
  );
};

export default CrossBtn;

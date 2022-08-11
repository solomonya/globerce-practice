import React, { FC } from 'react';
import classes from './crossBtn.module.css';

const CrossBtn: FC<{ className: string; handleClick: any }> = ({
  className,
  handleClick,
}) => {
  return (
    <button
      onClick={() => {
        handleClick();
      }}
      className={`${classes.cross} ${className}`}
    >
      <span className={classes.icon}></span>
    </button>
  );
};

export default CrossBtn;

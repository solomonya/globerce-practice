import { FC } from 'react';
import classes from './locationBtn.module.css';

const LocationBtn: FC<{ position: string }> = ({ position }) => {
  return (
    <button className={`${classes.btn} ${position}`}>
      <span className={classes.icon}></span>
      <span className={classes.label}>Алматы</span>
    </button>
  );
};

export default LocationBtn;

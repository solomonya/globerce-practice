import React, { FC } from 'react';
import classes from './allButton.module.css';

const AllButton: FC<{ title: string; size: string }> = ({ title, size }) => {
  return <button className={`${classes.button} ${size}`}>{title}</button>;
};

export default AllButton;

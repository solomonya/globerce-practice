import React from 'react';
import AllButtonProps from '../../scripts/@types/allButton';
import classes from './allButton.module.css';

const AllButton = ({ title, size }: AllButtonProps) => {
  return <button className={`${classes.button} ${size}`}>{title}</button>;
};

export default AllButton;

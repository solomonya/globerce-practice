import React, { FC } from 'react';
import classes from './skeleton.module.css';

const Skeleton: FC<{
  width: number;
  height: number;
  radius?: number;
  bottomMargin?: number;
}> = ({ width, height, bottomMargin, radius = 4 }) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    marginBottom: `${bottomMargin}px`,
    borderRadius: `${radius}px`,
  };
  return <div className={classes.skeleton} style={style}></div>;
};

export default Skeleton;

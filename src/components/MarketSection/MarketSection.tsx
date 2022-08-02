import React, { FC, PropsWithChildren, useState } from 'react';
import AllButton from '../AllButton/AllButton';
import classes from './marketSection.module.css';
import allBtnClasses from '../AllButton/allButton.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MarketSection: FC<
  PropsWithChildren<{
    append: boolean;
    title: string;
    children: any;
    loading: boolean;
  }>
> = ({ append, title, children, loading }) => {
  return (
    <section className={classes.section}>
      <div className={classes.header}>
        {loading ? (
          <Skeleton width={84} height={24} />
        ) : (
          <h5 className={classes.title}>{title}</h5>
        )}
        {append &&
          (loading ? (
            <Skeleton width={57} height={24} />
          ) : (
            <AllButton title='Все' size={allBtnClasses.sm} />
          ))}
      </div>
      <div className={classes.body}>{children}</div>
    </section>
  );
};

export default MarketSection;

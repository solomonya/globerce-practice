import React, { FC, PropsWithChildren } from 'react';
import AllButton from '../AllButton/AllButton';
import classes from './marketSection.module.css';
import allBtnClasses from '../AllButton/allButton.module.css';
import Skeleton from '../Skeleton/Skeleton';

const MarketSection: FC<
  PropsWithChildren<{
    append: boolean;
    title: string;
    children: any;
    loading: boolean;
    titleLength: number;
  }>
> = ({ append, title, children, loading, titleLength }) => {
  return (
    <section className={classes.section}>
      <div className={classes.header}>
        {loading ? (
          <Skeleton width={titleLength} height={24} />
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

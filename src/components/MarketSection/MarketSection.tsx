import React from 'react';
import TMarketSectionProps from '../../scripts/@types/marketSectionProps';
import AllButton from '../AllButton/AllButton';
import classes from './marketSection.module.css';
import allBtnClasses from '../AllButton/allButton.module.css';

function MarketSection({ append, title, children }: TMarketSectionProps) {
  return (
    <section className={classes.section}>
      <div className={classes.header}>
        <h5 className={classes.title}>{title}</h5>
        {append && <AllButton title='Все' size={allBtnClasses.sm} />}
      </div>
      <div className={classes.body}>{children}</div>
    </section>
  );
}

export default MarketSection;

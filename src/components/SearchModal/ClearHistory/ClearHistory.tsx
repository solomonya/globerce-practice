import { FC } from 'react';
import classes from './clearHistory.module.css';

const ClearHistory: FC = () => {
  return <button className={classes.button}>Очистить историю поиска</button>;
};

export default ClearHistory;

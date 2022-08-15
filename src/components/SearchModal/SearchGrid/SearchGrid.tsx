import { FC } from 'react';
import TSearchSuggest from '../../../@types/search-suggest';
import { v4 as uuidv4 } from 'uuid';
import SearchItem from '../SearchItem/SearchItem';
import classes from './searchGrid.module.css';

const SearchGrid: FC<{ searchItems: TSearchSuggest[] }> = ({ searchItems }) => {
  return (
    <ul className={classes.list}>
      {searchItems.map((searchSuggest) =>
        searchSuggest.items.map((searchItem) => {
          return (
            <li key={uuidv4()} className={classes.item}>
              <SearchItem {...searchItem} type={searchSuggest.type} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default SearchGrid;

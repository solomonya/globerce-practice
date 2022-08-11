import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import TSearchSuggest from '../../@types/search-suggest';
import { getSearchUrl } from '../../controllers/api-routes';
import Modal from '../Modal/Modal';
import SearchBar from '../SearchBar/SearchBar';
import SearchItem from './SearchItem/SearchItem';
import classes from './searchModal.module.css';
import { v4 as uuidv4 } from 'uuid';

const SearchModal: FC<{ isOpen: boolean; handleClose: any }> = ({
  isOpen,
  handleClose,
}) => {
  const [query, setQuery] = useState<string>('');
  const [searchItems, setSearchItems] = useState<TSearchSuggest[]>([]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get<TSearchSuggest[]>(getSearchUrl(query))
        .then((response) => response.data)
        .then((searchItems) => setSearchItems(searchItems));
    }
  }, [query]);

  return (
    <Modal isOpen={isOpen}>
      <div>
        <SearchBar
          showCancel={true}
          handleClose={handleClose}
          shouldOpenModal={false}
          handleSearch={setQuery}
        />
        <ul className={classes.list}>
          {searchItems.map((searchSuggest) =>
            searchSuggest.items.map((searchItem) => {
              return (
                <li key={uuidv4()} className={classes.item}>
                  <SearchItem
                    url={searchItem.url}
                    title={searchItem.title}
                    subtitle={searchItem.subtitle}
                    brand={searchItem.brand}
                  />
                </li>
              );
            })
          )}
        </ul>
      </div>
    </Modal>
  );
};

export default SearchModal;

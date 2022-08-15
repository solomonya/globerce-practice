import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import TSearchSuggest from '../../@types/search-suggest';
import { getSearchUrl } from '../../controllers/api-routes';
import Modal from '../Modal/Modal';
import SearchBar from '../SearchBar/SearchBar';
import ClearHistory from './ClearHistory/ClearHistory';
import SearchGrid from './SearchGrid/SearchGrid';

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
  }, [query, isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <>
        <SearchBar
          showCancel={true}
          handleClose={handleClose}
          shouldOpenModal={false}
          handleSearch={setQuery}
        />
        <SearchGrid searchItems={searchItems} />
      </>
      {query.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '16px 0',
          }}
        >
          <ClearHistory />
        </div>
      )}
    </Modal>
  );
};

export default SearchModal;

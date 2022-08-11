import React, { FC, useState } from 'react';
import CrossBtn from '../CrossBtn/CrossBtn';
import SearchModal from '../SearchModal/SearchModal';
import classes from './searchBar.module.css';

const SearchBar: FC<{
  showCancel: boolean;
  handleClose?: any;
  handleSearch?: any;
  shouldOpenModal: boolean;
}> = ({ showCancel, handleClose, shouldOpenModal, handleSearch }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [query, setQuery] = useState<string>('');

  const handleCancel = () => {
    handleClose();
    setQuery('');
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setQuery(target.value);
    handleSearch(target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className={classes.search}>
      <div className={classes.container}>
        <span className={classes.icon}></span>
        <input
          value={query}
          onInput={(e) => {
            handleInput(e);
          }}
          className={classes.input}
          type='text'
          placeholder='Найти в Globerce Market'
          onClick={() => {
            if (shouldOpenModal) setIsOpen(true);
          }}
        />
        {query.length > 0 && (
          <CrossBtn handleClick={handleClear} className='clear' />
        )}
      </div>
      {showCancel && (
        <button
          className={classes.cancel}
          onClick={() => {
            handleCancel();
          }}
        >
          Отменить
        </button>
      )}
      <SearchModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default SearchBar;

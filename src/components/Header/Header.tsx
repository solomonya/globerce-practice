import { useEffect } from 'react';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import SearchBar from '../SearchBar/SearchBar';
import classes from './header.module.css';

function Header() {
  return (
    <header className={classes.header}>
      <HeaderLogo />
      <SearchBar />
    </header>
  );
}

export default Header;

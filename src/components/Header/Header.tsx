import { FC, useEffect, useState } from 'react';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import LocationBtn from '../LocationBtn/LocationBtn';
import SearchBar from '../SearchBar/SearchBar';
import SearchModal from '../SearchModal/SearchModal';
import classes from './header.module.css';

const Header: FC = () => {
  const HEADER_LOGO_HEIGHT = 48;

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(Math.floor(window.scrollY));
    });
  }, []);

  let isScroll = scrollY >= HEADER_LOGO_HEIGHT;
  const hiddenLogoClass = `${classes.header} ${classes.hiddenLogo}`;
  const scrollSearchContainer = `${classes.searchContainer} ${classes.scrollSearchContainer}`;

  return (
    <header className={isScroll ? hiddenLogoClass : classes.header}>
      <HeaderLogo />
      <div
        className={isScroll ? scrollSearchContainer : classes.searchContainer}
      >
        <SearchBar />
        {isScroll && <LocationBtn position='' />}
      </div>
      <SearchModal />
    </header>
  );
};

export default Header;

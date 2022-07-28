import { useEffect } from 'react';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import LocationBtn from '../LocationBtn/LocationBtn';
import SearchBar from '../SearchBar/SearchBar';
import classes from './header.module.css';

function Header() {
  useEffect(() => {
    const handleScroll = (event: Event) => {
      console.log('window scrollY', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={classes.header}>
      <HeaderLogo />
      <SearchBar />
    </header>
  );
}

export default Header;

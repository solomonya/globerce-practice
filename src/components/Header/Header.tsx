import { useEffect } from 'react';
import { TProps } from '../../scripts/@types/headerProps';
import SearchBar from '../SearchBar/SearchBar';
import classes from './header.module.css';

function Header({ name }: TProps) {
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
      <h1> Hello, {name} !</h1>
      <SearchBar></SearchBar>
    </header>
  );
}

export default Header;

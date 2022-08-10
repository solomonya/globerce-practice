import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './navigation.module.css';
import homeIcon from '../../assets/icons/home.svg';
import userIcon from '../../assets/icons/user.svg';
import globerceIcon from '../../assets/icons/globerce-logo-small.svg';
import cartIcon from '../../assets/icons/cart.svg';
import categoriesIcon from '../../assets/icons/categories.svg';

const Navigation: FC = () => {
  const links = [
    { id: uuidv4(), title: 'Главная', icon: homeIcon },
    { id: uuidv4(), title: 'Категории', icon: categoriesIcon },
    { id: uuidv4(), title: 'Корзина', icon: cartIcon },
    { id: uuidv4(), title: 'Профиль', icon: userIcon },
    { id: uuidv4(), title: 'Globerce', icon: globerceIcon },
  ];

  return (
    <nav className={classes.navigation}>
      <ul className={classes.list}>
        {links.map((link) => {
          return (
            <li className={classes.item} key={link.id}>
              <a className={classes.link}>
                <img
                  className={classes.icon}
                  src={link.icon}
                  alt={`${link.title} icon`}
                />
                <span className={classes.title}>{link.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;

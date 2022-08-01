import React, { useEffect, useRef, useState } from 'react';
import TCategory from '../../scripts/@types/category';
import classes from './categoryGrid.module.css';
import { v4 as uuidv4 } from 'uuid';
import saleIMG from '../../assets/mocks/Sale.png';
import CategoryCard from './CategoryCard';
import useInView from '../../hooks/useInView';
import axios from 'axios';
import { CATEGORIES_URL } from '../../controllers/api-routes';

function CategoryGrid() {
  const targetRef = useRef(null);

  const sleletonCategories: Array<TCategory> = new Array(8).fill(0).map(() => {
    return {
      id: uuidv4(),
      imgSrc: saleIMG,
      title: '',
    };
  });

  const [categories, setCategories] = useState(sleletonCategories);
  const isVisible = useInView(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
    targetRef
  );

  const updateCategories = async () => {
    const categoriesResponse = await axios.get(CATEGORIES_URL);
    setCategories(categoriesResponse.data);
  };

  useEffect(() => {
    if (isVisible) updateCategories();
  }, [isVisible]);

  return (
    <ul className={classes.list} ref={targetRef}>
      {categories.map((categoryCard) => {
        return (
          <li className={classes.item} key={categoryCard.id}>
            <CategoryCard
              imgSrc={categoryCard.imgSrc}
              title={categoryCard.title}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryGrid;

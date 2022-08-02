import React, { FC, useEffect, useRef, useState } from 'react';
import CategoryGrid from './CategoryGrid/CategoryGrid';
import MarketSection from '../MarketSection/MarketSection';
import axios from 'axios';
import { CATEGORIES_URL } from '../../controllers/api-routes';
import useInView from '../../hooks/useInView';
import CategorySkeleton from './CategorySkeleton/CategorySkeleton';

const CategorySection: FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const targetRef = useRef(null);
  const isVisible = useInView(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
    targetRef
  );

  useEffect(() => {
    axios
      .get(CATEGORIES_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((reject) => {
        setError(reject);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isVisible]);

  return (
    <div ref={targetRef}>
      <MarketSection title='Категории' append={true} loading={loading}>
        {loading || error ? (
          <CategorySkeleton />
        ) : (
          <CategoryGrid categories={data} />
        )}
      </MarketSection>
    </div>
  );
};

export default CategorySection;

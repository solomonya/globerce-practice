import React, { FC, useEffect, useRef, useState } from 'react';
import CategoryGrid from './CategoryGrid/CategoryGrid';
import MarketSection from '../MarketSection/MarketSection';
import axios, { Axios, AxiosResponse } from 'axios';
import { CATEGORIES_URL } from '../../controllers/api-routes';
import useInView from '../../hooks/useInView';
import CategorySkeleton from './CategorySkeleton/CategorySkeleton';
import useRequest from '../../hooks/useRequest';
import TCategory from '../../@types/category';

const CategorySection: FC = () => {
  const targetRef = useRef(null);

  const { loading, error, data } = useRequest<TCategory[]>(
    CATEGORIES_URL,
    targetRef
  );

  return (
    <div ref={targetRef}>
      <MarketSection
        title='Категории'
        append={true}
        loading={loading}
        titleLength={84}
      >
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

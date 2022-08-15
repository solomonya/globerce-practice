import { FC, useRef } from 'react';
import CategoryGrid from './CategoryGrid/CategoryGrid';
import MarketSection from '../MarketSection/MarketSection';
import { CATEGORIES_URL } from '../../controllers/api-routes';
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

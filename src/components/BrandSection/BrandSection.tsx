import React, { FC, useRef } from 'react';
import TBrand from '../../@types/brand';
import { BRANDS_URL } from '../../controllers/api-routes';
import useRequest from '../../hooks/useRequest';
import MarketSection from '../MarketSection/MarketSection';
import Skeleton from '../Skeleton/Skeleton';
import Brands from './Brands/Brands';

const BrandSection: FC = () => {
  const targetRef = useRef(null);
  const { loading, error, data } = useRequest<TBrand[]>(BRANDS_URL, targetRef);

  return (
    <section ref={targetRef}>
      <MarketSection
        append={false}
        title={'Популярные бренды'}
        loading={loading}
        titleLength={165}
      >
        {(loading || error) && (
          <div style={{ paddingLeft: '20px' }}>
            <Skeleton width={336} height={232} radius={8} />
          </div>
        )}
        {!loading && <Brands brands={data}></Brands>}
      </MarketSection>
    </section>
  );
};

export default BrandSection;

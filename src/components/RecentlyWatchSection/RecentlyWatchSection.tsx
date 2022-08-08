import React, { FC, useRef } from 'react';
import { RECENTLY_WATCH_URL } from '../../controllers/api-routes';
import useRequest from '../../hooks/useRequest';
import TProduct from '../../@types/product';
import MarketSection from '../MarketSection/MarketSection';
import { RecentlyWatchList } from './RecentlyWatchList/RecentlyWatchLIst';
import RecentlyWatchSkeleton from './RecentlyWatchSkeleton/RecentlyWatchSkeleton';

const RecentlyWatchSection: FC = () => {
  const targetRef = useRef(null);

  const { loading, error, data } = useRequest<TProduct[]>(
    RECENTLY_WATCH_URL,
    targetRef
  );

  return (
    <div ref={targetRef}>
      <MarketSection
        title='Вы недавно смотрели'
        append={true}
        loading={loading}
        titleLength={155}
      >
        {loading || error ? (
          <RecentlyWatchSkeleton />
        ) : (
          <RecentlyWatchList list={data} />
        )}
      </MarketSection>
    </div>
  );
};

export default RecentlyWatchSection;

import axios from 'axios';
import React, { FC, useEffect, useRef, useState } from 'react';
import { RECENTLY_WATCH_URL } from '../../controllers/api-routes';
import useInView from '../../hooks/useInView';
import MarketSection from '../MarketSection/MarketSection';
import { RecentlyWatchList } from './RecentlyWatchList/RecentlyWatchLIst';
import RecentlyWatchSkeleton from './RecentlyWatchSkeleton/RecentlyWatchSkeleton';

const RecentlyWatchSection: FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const targetRef = useRef(null);
  let isVisible = useInView(
    {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    },
    targetRef
  );

  useEffect(() => {
    axios
      .get(RECENTLY_WATCH_URL)
      .then((response) => setData(response.data))
      .catch((reject) => setError(reject))
      .finally(() => setLoading(false));
  }, [isVisible]);

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

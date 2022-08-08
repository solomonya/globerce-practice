import React, { FC, useRef } from 'react';
import TBanner from '../../@types/banners';
import useRequest from '../../hooks/useRequest';
import Banners from '../Banners/Banners';
import SkeletBanners from '../Banners/SkeletBanners';
import MarketSection from '../MarketSection/MarketSection';

const PromoSection: FC<{
  promoBannersURL: string;
  width: number;
  height: number;
}> = ({ promoBannersURL, width, height }) => {
  const targetRef = useRef(null);
  const { loading, error, data } = useRequest<TBanner[]>(
    promoBannersURL,
    targetRef
  );

  return (
    <div ref={targetRef}>
      <MarketSection
        append={true}
        title='Акции'
        titleLength={155}
        loading={loading}
      >
        {loading || error ? (
          <SkeletBanners width={375} height={175} />
        ) : (
          <Banners banners={data} width={width} height={height} />
        )}
      </MarketSection>
    </div>
  );
};

export default PromoSection;

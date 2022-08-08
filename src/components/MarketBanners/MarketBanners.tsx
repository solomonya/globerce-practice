import React, { FC, useRef } from 'react';
import TBanner from '../../@types/banners';
import useRequest from '../../hooks/useRequest';
import Banners from '../Banners/Banners';
import SkeletBanners from '../Banners/SkeletBanners';

const MarketBanners: FC<{
  url: string;
  width: number;
  height: number;
}> = ({ url, width, height }) => {
  const targetRef = useRef(null);
  const { loading, error, data } = useRequest<TBanner[]>(url, targetRef);

  return (
    <div ref={targetRef}>
      {!loading && <Banners banners={data} width={width} height={height} />}
      {(loading || error) && <SkeletBanners width={width} height={height} />}
    </div>
  );
};

export default MarketBanners;

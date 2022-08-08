type TBanner = {
  id: string;
  media: {
    url: string;
    altText: string;
  };
};

export interface IBanners {
  banners: TBanner[] | null;
  width: number;
  height: number;
}

export default TBanner;

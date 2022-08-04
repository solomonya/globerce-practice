type TRecentlyWatchItem = {
  id: string;
  imgUrl: string;
  loan: boolean;
  discount: boolean;
  title: string;
  reviewsAmount: number;
  rating: number;
  actualPrice?: number;
  oldPrice: number;
};

export default TRecentlyWatchItem;

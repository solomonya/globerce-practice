type TProduct = {
  size?: string;
  id?: string;
  imgUrl: string;
  loan: boolean;
  discount: boolean;
  title: string;
  reviewsAmount: number;
  rating: number;
  actualPrice?: number;
  oldPrice: number;
  months?: number;
  monthPayment?: number;
};

export default TProduct;

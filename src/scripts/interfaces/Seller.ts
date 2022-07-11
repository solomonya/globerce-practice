export enum PaymentType {
  FULL_PRICE = 'FULL_PRICE',
  LOAN = 'LOAN',
  CREDIT = 'CREDIT',
}

interface SellerInfo {
  type: PaymentType;
  discountPrice: string | null;
  loanPrice: string | null;
  delivery: {
    date: string;
    price: string;
  } | null;
  label?: string;
  month?: string;
}

export default interface Seller {
  0: SellerInfo;
  3?: SellerInfo;
  6?: SellerInfo;
  12?: SellerInfo;
  24?: SellerInfo;
  36?: SellerInfo;
}

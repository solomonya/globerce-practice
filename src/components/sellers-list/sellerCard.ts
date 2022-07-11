import Seller, { PaymentType } from '../../scripts/interfaces/Seller';

export default class SellerCard {
  private CLASS_PRODUCT_COST: string = 'js-productCost';

  private sellerCard: HTMLElement;
  private fullPrice: number;
  private sellerInfo: Seller;
  private productCostEl: HTMLElement;

  constructor(cardItem: HTMLElement) {
    this.sellerCard = cardItem;
    this.sellerInfo = JSON.parse(this.sellerCard.getAttribute('data-offers'));
    console.log(this.sellerInfo);
    this.productCostEl = this.sellerCard.querySelector(
      `.${this.CLASS_PRODUCT_COST}`
    );

    this.setProductCost();
  }

  private setProductCost(): void {
    const paymentMonthsKeys = Object.keys(this.sellerInfo) as unknown;

    const fullPriceKey: keyof Seller = (
      paymentMonthsKeys as (keyof Seller)[]
    ).find((month) => {
      const monthPayment = this.sellerInfo[month];
      return monthPayment.type === PaymentType.FULL_PRICE;
    });

    const fullPriceMonth = this.sellerInfo[fullPriceKey];

    const loanPriceKey: keyof Seller = (
      paymentMonthsKeys as (keyof Seller)[]
    ).find((month) => {
      const monthPayment = this.sellerInfo[month];
      return monthPayment.type === PaymentType.LOAN;
    });

    const loanPriceMonth = this.sellerInfo[loanPriceKey];

    if (fullPriceMonth.discountPrice) {
      this.productCostEl.innerText = fullPriceMonth.discountPrice;
    } else {
      this.productCostEl.innerText = loanPriceMonth.loanPrice;
    }
  }
}

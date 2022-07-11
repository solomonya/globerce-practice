import Seller, {
  PaymentType,
  SellerInfo,
} from '../../scripts/interfaces/Seller';

export default class SellerCard {
  private CLASS_PRODUCT_COST: string = 'js-productCost';
  private CLASS_LOAN_MONTHLY_PAYMENT: string = 'js-loanMonthlyPayment';
  private CLASS_LOAN_MONTHS: string = 'js-loanMonths';

  private sellerCard: HTMLElement;
  private sellerInfo: Seller;
  private productCostEl: HTMLElement;
  private loanMonthlyPaymentEl: HTMLElement;
  private loanMonthsEl: HTMLElement;

  constructor(cardItem: HTMLElement) {
    this.sellerCard = cardItem;
    this.sellerInfo = JSON.parse(this.sellerCard.getAttribute('data-offers'));
    console.log(this.sellerInfo);
    this.productCostEl = this.sellerCard.querySelector(
      `.${this.CLASS_PRODUCT_COST}`
    );
    this.loanMonthlyPaymentEl = this.sellerCard.querySelector(
      `.${this.CLASS_LOAN_MONTHLY_PAYMENT}`
    );
    this.loanMonthsEl = this.sellerCard.querySelector(
      `.${this.CLASS_LOAN_MONTHS}`
    );
    this.setProductCost();
    console.log(this.loanMonthlyPaymentEl, this.loanMonthsEl);
  }

  public setLoanPrice(period: number) {
    const loanPeriodKey = period.toString() as unknown;
    const loanMonthlyPayment = this.sellerInfo[loanPeriodKey as keyof Seller];
    this.loanMonthlyPaymentEl.innerText = loanMonthlyPayment.loanPrice;
    this.loanMonthsEl.innerText = loanMonthlyPayment.month;
  }

  private setProductCost(): void {
    const fullPriceMonth = this.getPaymentMonth(PaymentType.FULL_PRICE);
    const loanPriceMonth = this.getPaymentMonth(PaymentType.LOAN);

    fullPriceMonth.discountPrice
      ? (this.productCostEl.innerText = fullPriceMonth.discountPrice)
      : (this.productCostEl.innerText = loanPriceMonth.loanPrice);
  }

  private getPaymentMonth(neededMonth: PaymentType): SellerInfo {
    const paymentMonthsKeys = Object.keys(this.sellerInfo) as unknown;
    const key: keyof Seller = (paymentMonthsKeys as (keyof Seller)[]).find(
      (month) => {
        const monthPayment = this.sellerInfo[month];
        return monthPayment.type === neededMonth;
      }
    );
    const paymentMonth = this.sellerInfo[key];
    return paymentMonth;
  }
}

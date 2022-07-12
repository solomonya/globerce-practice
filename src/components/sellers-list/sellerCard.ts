/*
TODO: create calculateFullLoanPrice method, for inserting new price, when use loan
*/

import Seller, {
  PaymentType,
  SellerInfo,
} from '../../scripts/interfaces/Seller';

export default class SellerCard {
  private CLASS_PRODUCT_COST: string = 'js-productCost';
  private CLASS_LOAN_MONTHLY_PAYMENT: string = 'js-loanMonthlyPayment';
  private CLASS_LOAN_MONTHS: string = 'js-loanMonths';
  private CLASS_LOAN: string = 'js-productLoan';
  private CLASS_LOAN_TITLE: string = 'js-loanTitle';

  private sellerCard: HTMLElement;
  private sellerInfo: Seller;
  private productCostEl: HTMLElement;
  private loanMonthlyPaymentEl: HTMLElement;
  private loanMonthsEl: HTMLElement;
  private loanProductEl: HTMLElement;
  private loanTitleEl: HTMLSpanElement;

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
    this.loanProductEl = this.sellerCard.querySelector(`.${this.CLASS_LOAN}`);
    this.loanTitleEl = this.sellerCard.querySelector(
      `.${this.CLASS_LOAN_TITLE}`
    );
    this.setFullPrice();
    console.log(this.loanProductEl);
  }

  public setLoanPrice(period: number) {
    const loanPeriodKey = period.toString();
    if (this.hasLoanPeriod(period)) {
      this.drawLoanPrices(loanPeriodKey);
    } else {
      this.setFullPrice();
    }
  }

  public setFullPrice(): void {
    const fullPriceMonth = this.getPaymentMonth(PaymentType.FULL_PRICE);
    const loanPriceMonth = this.getPaymentMonth(PaymentType.LOAN);
    const loanSummaryPrice = this.beautifyPrice(
      this.calculateSummaryLoanPrice(
        loanPriceMonth.loanPrice,
        loanPriceMonth.month
      )
    );

    fullPriceMonth.discountPrice
      ? (this.productCostEl.innerText = fullPriceMonth.discountPrice)
      : (this.productCostEl.innerText = loanSummaryPrice);
    this.loanProductEl.classList.add('d-none');
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

  private hasLoanPeriod(period: number) {
    return Object.keys(this.sellerInfo).includes(period.toString());
  }

  private drawLoanPrices(loanPeriodKey: unknown) {
    const loanMonthlyPayment = this.sellerInfo[loanPeriodKey as keyof Seller];
    const loanSummaryPrice = this.beautifyPrice(
      this.calculateSummaryLoanPrice(
        loanMonthlyPayment.loanPrice,
        loanMonthlyPayment.month
      )
    );
    this.loanMonthlyPaymentEl.innerText = loanMonthlyPayment.loanPrice;
    this.loanMonthsEl.innerText = loanMonthlyPayment.month;
    this.loanTitleEl.innerText = loanMonthlyPayment.label;
    this.productCostEl.innerText = loanSummaryPrice;
    this.loanProductEl.classList.remove('d-none');
  }

  private parseNumber(str: string) {
    let regexp = /\d+/g;
    return parseInt(str.replaceAll(' ', '').match(regexp)[0]);
  }

  private calculateSummaryLoanPrice(
    monthlyPayment: string,
    months: string
  ): number {
    return this.parseNumber(monthlyPayment) * this.parseNumber(months);
  }

  private beautifyPrice(price: number): string {
    let dividedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${dividedPrice} ₸`;
  }
}

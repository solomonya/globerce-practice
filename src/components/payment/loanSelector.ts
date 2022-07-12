import { fromEvent, Observer, Subject } from 'rxjs';

export default class LoanSelector {
  private CLASS_PAYMENT_LOAN_MONTH: string = 'js-paymentLoanMonth';
  private CLASS_PAYMENT_LOAN_BOX: string = 'js-paymentLoanBox';
  private CLASS_PAYMENT_CARD: string = 'js-paymentCard';
  private CLASS_PAYMENT: string = 'js-payment';

  private streamOnChange;
  private paymentLoanBox: HTMLElement;
  private paymentCard: HTMLButtonElement;
  private payment: HTMLDivElement;

  constructor() {
    this.streamOnChange = new Subject();
    this.payment = document.querySelector(`.${this.CLASS_PAYMENT}`);
    this.paymentLoanBox = this.payment.querySelector(
      `.${this.CLASS_PAYMENT_LOAN_BOX}`
    );
    this.paymentCard = this.payment.querySelector(
      `.${this.CLASS_PAYMENT_CARD}`
    );
    this.attachEvents();
    console.log(this.paymentLoanBox);
    console.log(this.paymentCard);
  }

  public getStreamOnChange() {
    return this.streamOnChange;
  }

  private attachEvents(): void {
    fromEvent(this.payment, 'click').subscribe((e: Event) => {
      this.streamOnChange.next(e);
    });

    this.streamOnChange.subscribe((e: Event) => {});
  }
}

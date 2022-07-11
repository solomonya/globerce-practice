import { fromEvent, Observer, Subject } from 'rxjs';

export default class LoanSelector {
  private CLASS_PAYMENT_LOAN_MONTH: string = 'js-paymentLoanMonth';
  private CLASS_PAYMENT_LOAN_BOX: string = 'js-paymentLoanBox';
  private streamOnChange;
  private paymentLoanBox: HTMLElement;

  constructor() {
    this.streamOnChange = new Subject();
    this.paymentLoanBox = document.querySelector(
      `.${this.CLASS_PAYMENT_LOAN_BOX}`
    );
    this.attachEvents();
    console.log(this.paymentLoanBox);
  }

  public getStreamOnChange() {
    return this.streamOnChange;
  }

  private attachEvents(): void {
    fromEvent(this.paymentLoanBox, 'click').subscribe((e: Event) => {
      this.streamOnChange.next(e);
    });

    this.streamOnChange.subscribe((e: Event) => {});
  }
}

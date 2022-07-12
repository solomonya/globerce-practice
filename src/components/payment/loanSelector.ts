import { fromEvent, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export default class LoanSelector {
  private CLASS_PAYMENT_LOAN_MONTH: string = 'js-paymentLoanMonth';
  private CLASS_PAYMENT_LOAN_BOX: string = 'js-paymentLoanBox';
  private CLASS_PAYMENT_CARD: string = 'js-paymentCard';
  private CLASS_PAYMENT: string = 'js-payment';

  private streamOnChange: Subject<number>;
  private loanMonths;
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
    this.loanMonths = this.payment.querySelectorAll(
      `.${this.CLASS_PAYMENT_LOAN_MONTH}`
    );
    this.attachEvents();
  }

  public getStreamOnChange() {
    return this.streamOnChange.asObservable();
  }

  public removeLoanSelectorFocus() {
    this.payment.classList.remove('payment_active');
    Array.from(this.loanMonths).forEach((month) => {
      const monthInput = month.firstChild as HTMLInputElement;
      monthInput.checked = false;
    });
  }

  private attachEvents(): void {
    fromEvent(this.payment, 'click')
      .pipe(
        filter((e) => {
          const target = e.target as HTMLElement;
          return !!this.getItemByTarget(target);
        }),
        map((e) => this.getItemByTarget(e.target as HTMLElement))
      )
      .subscribe((item: HTMLElement) => {
        const inputEl = item.querySelector('input');
        this.addLoanSelectorFocus();
        this.streamOnChange.next(parseFloat(inputEl.value));
      });
  }

  private getItemByTarget(target: HTMLElement): HTMLElement | null {
    if (target.classList.contains(this.CLASS_PAYMENT_LOAN_MONTH)) {
      return target;
    }
    return target.closest(`.${this.CLASS_PAYMENT_LOAN_MONTH}`) || null;
  }

  private addLoanSelectorFocus() {
    this.payment.classList.add('payment_active');
  }
}

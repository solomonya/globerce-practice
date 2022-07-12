import { fromEvent, Subject } from 'rxjs';
import LoanSelector from '../../components/payment/loanSelector';

export default class Payment {
  private CLASS_CARD_PAYMENT = 'js-paymentCard';

  private cardPaymentType: HTMLInputElement;
  private loanStreamChanged;
  private paymentStream;

  constructor() {
    this.paymentStream = new Subject();
    this.loanStreamChanged = new LoanSelector();
    this.cardPaymentType = document.querySelector(
      `.${this.CLASS_CARD_PAYMENT}`
    );
    this.attachEvents();
  }

  public removeCardPaymentFocus() {
    this.cardPaymentType.checked = false;
  }

  public getPaymentStream() {
    return this.paymentStream.asObservable();
  }

  private attachEvents() {
    fromEvent(this.cardPaymentType, 'click').subscribe((e: Event) => {
      this.paymentStream.next(e);
    });

    const loanStream = this.loanStreamChanged.getStreamOnChange();
    loanStream.subscribe((e) => {
      this.paymentStream.next(e);
    });
  }
}

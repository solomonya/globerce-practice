import { fromEvent, Subject, Observable } from 'rxjs';
import LoanSelector from '../../components/payment/loanSelector';
import { PaymentType } from '../interfaces/Seller';

type TPaymentMethod = TPaymentMethodFullPrice | TPaymentMethodLoan;
type TPaymentMethodFullPrice = {
  type: PaymentType.FULL_PRICE;
};
type TPaymentMethodLoan = {
  type: Omit<PaymentType, PaymentType.FULL_PRICE>;
  period: number;
};

export default class Payment {
  private CLASS_CARD_PAYMENT = 'js-paymentCard';

  private cardPaymentType: HTMLInputElement;
  private loanSelector: LoanSelector;
  private paymentStream: Subject<TPaymentMethod>;

  constructor() {
    this.paymentStream = new Subject();
    this.loanSelector = new LoanSelector();
    this.cardPaymentType = document.querySelector(
      `.${this.CLASS_CARD_PAYMENT}`
    );
    this.attachEvents();
  }

  public removeCardPaymentFocus(): void {
    this.cardPaymentType.checked = false;
  }

  public getPaymentStream(): Observable<TPaymentMethod> {
    return this.paymentStream.asObservable();
  }

  private attachEvents() {
    fromEvent(this.cardPaymentType, 'change').subscribe(() => {
      this.paymentStream.next({
        type: PaymentType.FULL_PRICE,
      });
    });

    this.loanSelector.getStreamOnChange().subscribe((period) => {
      this.paymentStream.next({
        type: PaymentType.LOAN,
        period: period,
      });
    });
  }
}

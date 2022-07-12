import SellerCard from '../../components/sellers-list/sellerCard';
import Payment from '../modules/Payment';
import LoanSelector from '../../components/payment/loanSelector';
import { PaymentType } from '../interfaces/Seller';

export default class ProductSellers {
  private CLASS_SELLER_CARD: string = 'js-productSellersItem';

  private sellerCards: Array<SellerCard>;
  private loanSelector;
  private sellerCardsElems: NodeList;
  private payment: Payment;

  constructor() {
    this.sellerCards = [];
    this.sellerCardsElems = document.querySelectorAll(
      `.${this.CLASS_SELLER_CARD}`
    );
    this.loanSelector = new LoanSelector();
    Array.from(this.sellerCardsElems).forEach((elem) => {
      this.sellerCards.push(new SellerCard(elem as HTMLElement));
    });
    this.payment = new Payment();
    this.attachEvents();
  }

  private attachEvents() {
    this.payment.getPaymentStream().subscribe((data) => {
      if (data.type === PaymentType.FULL_PRICE) {
        this.sellerCards.forEach((sellerCard) => {
          sellerCard.setFullPrice();
        });
        this.loanSelector.removeLoanSelectorFocus();
      } else {
        this.payment.removeCardPaymentFocus();
        this.sellerCards.forEach((sellerCard) => {
          sellerCard.setLoanPrice(data.period);
        });
      }
    });
  }
}

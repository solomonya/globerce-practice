import SellerCard from '../../components/sellers-list/sellerCard';
import Payment from '../modules/Payment';
import LoanSelector from '../../components/payment/loanSelector';

export default class ProductSellers {
  private CLASS_SELLER_CARD: string = 'js-productSellersItem';

  private sellerCards: Array<SellerCard>;
  private loanSelector;
  private sellerCardsElems: NodeList;
  private paymentStream;

  constructor() {
    this.sellerCards = [];
    this.sellerCardsElems = document.querySelectorAll(
      `.${this.CLASS_SELLER_CARD}`
    );
    this.loanSelector = new LoanSelector();
    Array.from(this.sellerCardsElems).forEach((elem) => {
      this.sellerCards.push(new SellerCard(elem as HTMLElement));
    });
    this.paymentStream = new Payment();
    this.attachEvents();
  }

  private attachEvents() {
    const paymentStream = this.paymentStream.getPaymentStream();

    paymentStream.subscribe((e: Event) => {
      const paymentType = e.target as HTMLElement;
      const paymentValue = paymentType.getAttribute('data-value');
      if (parseInt(paymentValue)) {
        this.paymentStream.removeCardPaymentFocus();
        this.sellerCards.forEach((sellerCard) => {
          sellerCard.setLoanPrice(parseInt(paymentValue));
        });
      } else {
        this.sellerCards.forEach((sellerCard) => {
          sellerCard.setFullPrice();
        });
        this.loanSelector.removeLoanSelectorFocus();
      }
    });
  }
}

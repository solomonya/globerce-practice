import LoanSelector from '../../components/payment/loanSelector';
import SellerCard from '../../components/sellers-list/sellerCard';

export default class ProductSellers {
  private CLASS_SELLER_CARD: string = 'js-productSellersItem';

  private sellerCards: Array<SellerCard>;
  private sellerCardsElems: NodeList;
  private loanSellector: LoanSelector;

  constructor() {
    this.loanSellector = new LoanSelector();
    this.sellerCards = [];
    this.sellerCardsElems = document.querySelectorAll(
      `.${this.CLASS_SELLER_CARD}`
    );

    Array.from(this.sellerCardsElems).forEach((elem) => {
      this.sellerCards.push(new SellerCard(elem as HTMLElement));
    });
    this.attachEvents();
  }

  private attachEvents() {
    const streamOnChange = this.loanSellector.getStreamOnChange();
    streamOnChange.subscribe((e: Event) => {
      const month = e.target as HTMLElement;
      const monthValue = month.getAttribute('data-value');
      if (parseInt(monthValue)) {
        this.sellerCards.forEach((sellerCard) => {
          sellerCard.setLoanPrice(parseInt(monthValue));
        });
      } else if (monthValue === 'card') {
        this.sellerCards.forEach((sellerCard) => {
          sellerCard.setFullPrice();
        });
      }
    });
  }
}

import LoanSelector from '../../components/payment/loanSelector';
import SellerCard from '../../components/sellers-list/sellerCard';

export default class ProductSellers {
  private CLASS_SELLER_CARD: string = 'js-productSellersItem';

  private sellerCards: Array<SellerCard>;
  private sellerCardsElems: NodeList;
  private loanSellector: LoanSelector;

  constructor() {
    this.sellerCards = [];
    this.sellerCardsElems = document.querySelectorAll(
      `.${this.CLASS_SELLER_CARD}`
    );

    Array.from(this.sellerCardsElems).forEach((elem) => {
      this.sellerCards.push(new SellerCard(elem as HTMLElement));
    });
    console.log(this.sellerCards);
  }
}

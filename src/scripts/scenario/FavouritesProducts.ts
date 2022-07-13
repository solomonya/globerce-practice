import ProductCard from '../../components/product-card/ProductCard';

export default class FavouriteProducts {
  private CLASS_PRODUCT_CARD: string = 'js-productCard';

  private products: Array<ProductCard> = [];
  private productsCardEl;
  constructor() {
    this.productsCardEl = Array.from(
      document.querySelectorAll(`.${this.CLASS_PRODUCT_CARD}`)
    );
    this.productsCardEl.forEach((productEl) => {
      this.products.push(new ProductCard(productEl as HTMLElement));
    });
  }
}

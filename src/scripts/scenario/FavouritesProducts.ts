import ProductCard from '../../components/product-card/ProductCard';
import getFavouriteList from '../modules/getFavouriteList';

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
    this.defineFavouriteProducts();
  }

  private async defineFavouriteProducts() {
    this.products.forEach((product) => {
      product.favouriteBtn.colorizeBtn(false, true);
    });

    const favouriteList = getFavouriteList();
    favouriteList.then((favouriteList) => {
      this.products.forEach((product) => {
        const isFavourite = favouriteList.includes(product.productCardId);
        product.favouriteBtn.colorizeBtn(isFavourite);
      });
    });
  }
}

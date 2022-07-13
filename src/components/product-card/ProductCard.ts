import axios from 'axios';
import { fromEvent } from 'rxjs';
import FavouriteBtn from '../favourite-btn/FavouriteBtn';

export default class ProductCard {
  private CLASS_FAVOURITE_BTN: string = 'js-favouriteBtn';

  private productCardEl: HTMLElement;
  private favouriteBtnEl: HTMLButtonElement;
  private favouriteBtn: FavouriteBtn;
  private productCardId: number;

  constructor(productCardEl: HTMLElement) {
    this.productCardEl = productCardEl;
    this.favouriteBtnEl = this.productCardEl.querySelector(
      `.${this.CLASS_FAVOURITE_BTN}`
    );
    this.productCardId = parseFloat(this.productCardEl.getAttribute('data-id'));
    this.favouriteBtn = new FavouriteBtn(
      this.favouriteBtnEl,
      this.productCardId
    );
  }
}

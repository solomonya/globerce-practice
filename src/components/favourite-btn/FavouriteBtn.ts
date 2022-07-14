import axios from 'axios';
import { fromEvent } from 'rxjs';

export default class FavouriteBtn {
  private favouriteBtnEl: HTMLButtonElement;
  private cardId: number;

  constructor(favouriteBtnEl: HTMLButtonElement, id: number) {
    this.favouriteBtnEl = favouriteBtnEl;
    this.cardId = id;
    this.attachEvents();
  }

  public colorizeBtn(isFavourite: boolean, loading = false) {
    console.log(isFavourite);

    if (loading) {
      this.favouriteBtnEl.innerHTML = this.getSpinnerTemplate();
      return;
    }

    this.favouriteBtnEl.innerHTML = this.getFavoriteIconTemplate();
    const btnIcon = this.favouriteBtnEl.firstChild as HTMLElement;

    if (isFavourite) {
      btnIcon.className =
        'product-card__favorite-icon product-card__favorite-icon_added';
    } else {
      btnIcon.className =
        'product-card__favorite-icon product-card__favorite-icon_not-added';
    }
  }

  public async updateFavouriteState(id: number) {
    this.favouriteBtnEl.disabled = true;
    this.colorizeBtn(false, true);
    const favouriteBtnResponse = await axios.post(
      `http://localhost:3003/favourite-list/processing/${id}`
    );
    const favouritesProducts = favouriteBtnResponse.data as Array<Number>;
    const isFavourite = favouritesProducts.includes(this.cardId);
    this.colorizeBtn(isFavourite);
    this.favouriteBtnEl.disabled = false;
  }

  private attachEvents() {
    fromEvent(this.favouriteBtnEl, 'click').subscribe(() => {
      this.updateFavouriteState(this.cardId);
    });
  }

  private getSpinnerTemplate(): string {
    return ` <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`;
  }

  private getFavoriteIconTemplate(): string {
    return `<span class="product-card__favorite-icon"></span>`;
  }
}

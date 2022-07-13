import axios from 'axios';
import { fromEvent } from 'rxjs';

export default class FavouriteBtn {
  private favouriteBtnEl: HTMLButtonElement;
  private cardId: number;

  constructor(favouriteBtnEl: HTMLButtonElement, id: number) {
    this.favouriteBtnEl = favouriteBtnEl;
    this.cardId = id;
    this.defineFavouriteState();
    this.attachEvents();
  }

  private attachEvents() {
    fromEvent(this.favouriteBtnEl, 'click').subscribe(() => {
      this.updateFavouriteState(this.cardId);
    });
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

  private async defineFavouriteState() {
    this.colorizeBtn(false, true);
    const favouriteBtnResponse = await axios.get(
      `http://localhost:3003/favourite-list/`
    );
    const favouritesProducts = favouriteBtnResponse.data as Array<Number>;
    const isFavourite = favouritesProducts.includes(this.cardId);
    this.colorizeBtn(isFavourite);
  }

  private colorizeBtn(isFavourite: boolean, loading = false) {
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

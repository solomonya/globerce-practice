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
    this.colorizeBtn(false, true);
    const favouriteBtnResponse = await axios.post(
      `http://localhost:3003/favourite-list/processing/${id}`
    );
    const favouritesProducts = favouriteBtnResponse.data as Array<Number>;
    const isFavourite = favouritesProducts.includes(this.cardId);
    this.colorizeBtn(isFavourite);
  }

  private async defineFavouriteState() {
    const favouriteBtnResponse = await axios.get(
      `http://localhost:3003/favourite-list/`
    );
    const favouritesProducts = favouriteBtnResponse.data as Array<Number>;
    const isFavourite = favouritesProducts.includes(this.cardId);
    this.colorizeBtn(isFavourite);
  }

  private colorizeBtn(isFavourite: boolean, loading = false) {
    console.log(isFavourite);
    const btnIcon = this.favouriteBtnEl.firstChild as HTMLElement;

    if (loading) {
      console.log('load');
      btnIcon.className =
        'product-card__favorite-icon product-card__favorite-icon_load';
      return;
    }

    if (isFavourite) {
      btnIcon.className =
        'product-card__favorite-icon product-card__favorite-icon_added';
    } else {
      btnIcon.className =
        'product-card__favorite-icon product-card__favorite-icon_not-added';
    }
  }
}

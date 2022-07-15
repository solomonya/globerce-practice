import { fromEvent } from 'rxjs';
import City from '../../scripts/interfaces/cities';
import { blockBodyScroll, returnBodyScroll } from '../bodyEl/scrollBehavior';
import SearchInput from '../search-bar/search-input';

export default class CityModal {
  private CLASS_CLOSE_BTN: string = 'js-citiesModalCloseBtn';
  private CLASS_CITIES_SEARCH: string = 'js-citiesSearch';

  private cityModalEl: HTMLDivElement;
  private cityModalCloseBtnEl: HTMLButtonElement;
  private citySearchEl: HTMLElement;
  private citySearch: SearchInput;
  private citiesList: Array<City>;

  constructor(cityModalEl: HTMLDivElement) {
    this.cityModalEl = cityModalEl;
    this.cityModalCloseBtnEl = this.cityModalEl.querySelector(
      `.${this.CLASS_CLOSE_BTN}`
    );
    this.citySearchEl = this.cityModalEl.querySelector(
      `.${this.CLASS_CITIES_SEARCH}`
    );
    this.citySearch = new SearchInput(this.citySearchEl);
    this.citiesList = [];
    this.getCitiesList();
  }

  public open() {
    this.cityModalEl.classList.add('cities-modal_open');
    blockBodyScroll();
    this.attachEvents();
  }

  private attachEvents() {
    fromEvent(this.cityModalCloseBtnEl, 'click').subscribe((e: Event) => {
      this.close();
    });
  }

  private close() {
    this.cityModalEl.classList.remove('cities-modal_open');
    returnBodyScroll();
  }

  private async getCitiesList() {}
}

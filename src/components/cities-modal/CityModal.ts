import axios from 'axios';
import { fromEvent } from 'rxjs';
import { EServerResponse } from '../../scripts/enums/serverResponse';
import ICity from '../../scripts/interfaces/cities';
import { blockBodyScroll, returnBodyScroll } from '../bodyEl/scrollBehavior';
import SearchInput from '../search-bar/search-input';

export default class CityModal {
  private CLASS_CLOSE_BTN: string = 'js-citiesModalCloseBtn';
  private CLASS_CITIES_SEARCH: string = 'js-citiesSearch';
  private CLASS_CITIES_LIST: string = 'js-citiesList';

  private cityModalEl: HTMLDivElement;
  private cityModalCloseBtnEl: HTMLButtonElement;
  private citySearchEl: HTMLElement;
  private citySearch: SearchInput;
  private citiesListEl: HTMLUListElement;
  private citiesList: Promise<Array<ICity>>;

  constructor(cityModalEl: HTMLDivElement) {
    this.cityModalEl = cityModalEl;
    this.cityModalCloseBtnEl = this.cityModalEl.querySelector(
      `.${this.CLASS_CLOSE_BTN}`
    );
    this.citySearchEl = this.cityModalEl.querySelector(
      `.${this.CLASS_CITIES_SEARCH}`
    );
    this.citiesListEl = this.cityModalEl.querySelector(
      `.${this.CLASS_CITIES_LIST}`
    );
    this.citySearch = new SearchInput(this.citySearchEl);
    this.citiesList = this.getCitiesList();
    this.buildCitiesList();
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

  private async getCitiesList(): Promise<ICity[]> {
    const citiesListResponse = await axios.get(
      'http://localhost:3003/cities-list/'
    );
    if (citiesListResponse.status === EServerResponse.OK) {
      const citiesList = citiesListResponse.data as Array<ICity>;
      return citiesList;
    }
  }

  private buildCitiesList(): void {
    let citiesTemplate = '';
    this.citiesList.then((citiesList) => {
      citiesList.forEach((city) => {
        citiesTemplate += this.getCityTemplate(city);
      });
      this.citiesListEl.innerHTML = citiesTemplate;
    });
  }

  private getCityTemplate(city: ICity): string {
    return `
      <li class="cities-modal__item">
        <div class="cities-modal__city">
          <div class="cities-modal__city-container">
            <label for="${city.id}" class="cities-modal__city-title">${city.title}</label>
            <input type="radio" name="select-city" id="${city.id}" class="cities-modal__radio"/>
          </div>
        </div>
      </li>
    `;
  }
}

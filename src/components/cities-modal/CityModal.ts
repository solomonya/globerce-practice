import axios from 'axios';
import { fromEvent } from 'rxjs';
import { EServerResponse } from '../../scripts/enums/serverResponse';
import ICity from '../../scripts/interfaces/cities';
import SearchInput from '../search-bar/search-input';
import { filter, map } from 'rxjs/operators';
import BottomModal from '../bottom-modal/BottomModal';

export default class CityModal extends BottomModal {
  private CLASS_CITIES_SEARCH: string = 'js-citiesSearch';
  private CLASS_CITIES_LIST: string = 'js-citiesList';
  private CLASS_CITY_INPUT: string = 'js-cityInput';

  private citySearchEl: HTMLElement;
  private citySearch: SearchInput;
  private citiesListEl: HTMLUListElement;
  private citiesList: Array<ICity>;
  private isCitiesListRecived: boolean = false;

  constructor(modalEl: HTMLDivElement) {
    super(modalEl);
    this.citySearchEl = super
      .getModalWrapper()
      .querySelector(`.${this.CLASS_CITIES_SEARCH}`);
    this.citiesListEl = super
      .getModalWrapper()
      .querySelector(`.${this.CLASS_CITIES_LIST}`);
    this.citySearch = new SearchInput(this.citySearchEl);
    this.citiesList = [];
  }

  public open() {
    super.open();
    this.isCitiesListRecived ? this.buildCitiesList : this.getCitiesList();
    this.attachCityEvents();
  }

  public close() {
    super.close();
    this.citySearch.clearInput();
  }

  private attachCityEvents() {
    fromEvent(this.citySearchEl, 'input-change').subscribe((e: CustomEvent) => {
      const inputValue = e.detail.toLowerCase() as string;
      this.handleCitySearchInputChange(inputValue);
    });

    fromEvent(this.citiesListEl, 'click')
      .pipe(
        filter((e) => {
          const target = e.target as HTMLElement;
          return !!this.getItemByTarget(target);
        }),
        map((e) => this.getItemByTarget(e.target as HTMLElement))
      )
      .subscribe((radioInput: HTMLInputElement) => {
        this.emitCitySelected(radioInput);
      });

    fromEvent(this.citySearchEl, 'cancel').subscribe((e: Event) => {
      this.close();
    });

    fromEvent(this.citiesListEl, 'scroll').subscribe((e: Event) => {
      this.handleScroll();
    });
  }

  private handleScroll(): void {
    if (this.citiesListEl.scrollTop > 0) {
      this.citySearchEl.classList.add('search_elevated');
    } else {
      this.citySearchEl.classList.remove('search_elevated');
    }
  }

  private async getCitiesList() {
    const citiesListResponse = await axios.get(
      'http://localhost:3003/cities-list/'
    );
    if (citiesListResponse.status === EServerResponse.OK) {
      const citiesList = citiesListResponse.data as Array<ICity>;
      this.handleGetCitiesRequest(citiesList);
    }
  }

  private handleGetCitiesRequest(citiesList: Array<ICity>) {
    this.citiesList = citiesList;
    this.buildCitiesList();
    this.isCitiesListRecived = true;
  }

  private buildCitiesList(): void {
    this.renderCitiesList(this.citiesList);
  }

  private getCityTemplate(city: ICity): string {
    return `
      <li class="cities-modal__item">
        <div class="cities-modal__city">
          <div class="cities-modal__city-container">
            <label for="${city.id}" class="cities-modal__city-title">${
      city.title
    }</label>
            <input type="radio" name="select-city" id="${city.id}" value="${
      city.title
    }" class="cities-modal__radio js-cityInput" ${
      city.current ? 'checked' : ''
    }/>
          </div>
        </div>
      </li>
    `;
  }

  private handleCitySearchInputChange(inputValue: string) {
    const updatedCitiesList: Array<ICity> = [];
    this.citiesList.forEach((city) => {
      const title = city.title.toLowerCase();
      if (title.includes(inputValue)) {
        updatedCitiesList.push(city);
      }
    });
    this.renderCitiesList(updatedCitiesList);
  }

  private renderCitiesList(cityList: Array<ICity>) {
    let citiesTemplate = '';
    cityList.forEach((city) => {
      citiesTemplate += this.getCityTemplate(city);
    });
    this.citiesListEl.innerHTML = citiesTemplate;
  }

  private getItemByTarget(target: HTMLElement): HTMLElement | null {
    if (target.classList.contains(this.CLASS_CITY_INPUT)) {
      return target;
    }
    return target.closest(`.${this.CLASS_CITY_INPUT}`) || null;
  }

  private emitCitySelected(radioInput: HTMLInputElement) {
    this.close();
    radioInput.checked = true;
    const city = radioInput.value;
    const event = new CustomEvent('city-selected', {
      detail: city,
    });
    super.getModalWrapper().dispatchEvent(event);
  }
}

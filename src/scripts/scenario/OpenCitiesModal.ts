import { fromEvent } from 'rxjs';
import CityModal from '../../components/cities-modal/CityModal';

export default class OpenCitiesModal {
  private CLASS_OPEN_CITIES_HANDLER: string = 'js-openCitiesModalHandler';
  private CLASS_CITIES_MODAL: string = 'js-modalWrapper';
  private CLASS_LOCATION_CITY_TITLE: string = 'js-locationCityTitle';

  private openCitiesHandlers;
  private locationCityTitlesEl: Array<HTMLElement>;
  private citiesModalEl: HTMLDivElement;
  private cityModal: CityModal;

  constructor() {
    this.openCitiesHandlers = Array.from(
      document.querySelectorAll(`.${this.CLASS_OPEN_CITIES_HANDLER}`)
    );
    this.locationCityTitlesEl = [];
    this.openCitiesHandlers.forEach((locationBtn) => {
      this.locationCityTitlesEl.push(
        locationBtn.querySelector(`.${this.CLASS_LOCATION_CITY_TITLE}`)
      );
    });
    this.citiesModalEl = document.querySelector(`.${this.CLASS_CITIES_MODAL}`);
  }

  public init() {
    if (!(this.openCitiesHandlers.length !== 0 && this.citiesModalEl)) {
      return;
    }
    this.cityModal = new CityModal(this.citiesModalEl);
    this.attachEvents();
  }

  private attachEvents() {
    this.openCitiesHandlers.forEach((openCitiesModalHandler) => {
      fromEvent(openCitiesModalHandler, 'click').subscribe((e: Event) => {
        this.cityModal.open();
      });
    });

    fromEvent(this.citiesModalEl, 'city-selected').subscribe(
      (e: CustomEvent) => {
        this.locationCityTitlesEl.forEach((cityTitle) => {
          cityTitle.textContent = `${e.detail}`;
        });
      }
    );
  }
}

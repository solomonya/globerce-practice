import { fromEvent } from 'rxjs';
import CityModal from '../../components/cities-modal/CityModal';

export default class OpenCitiesModal {
  private CLASS_OPEN_CITIES_HANDLER: string = 'js-openCitiesModalHandler';
  private CLASS_CITIES_MODAL: string = 'js-citiesModal';

  private openCitiesHandlers;
  private citiesModalEl: HTMLDivElement;
  private cityModal: CityModal;

  constructor() {
    this.openCitiesHandlers = document.querySelectorAll(
      `.${this.CLASS_OPEN_CITIES_HANDLER}`
    );
    this.citiesModalEl = document.querySelector(`.${this.CLASS_CITIES_MODAL}`);
  }

  public init() {
    if (!(this.openCitiesHandlers || this.citiesModalEl)) {
      return;
    }
    this.cityModal = new CityModal(this.citiesModalEl);
    this.attachEvents();
  }

  private attachEvents() {
    Array.from(this.openCitiesHandlers).forEach((openCitiesModalHandler) => {
      fromEvent(openCitiesModalHandler, 'click').subscribe((e: Event) => {
        this.cityModal.open();
      });
    });
  }
}

export default class CityModal {
  private cityModalEl: HTMLDivElement;

  constructor(cityModalEl: HTMLDivElement) {
    this.cityModalEl = cityModalEl;
  }

  public open() {
    this.cityModalEl.classList.add('cities-modal_open');
  }
}

import { fromEvent } from 'rxjs';

export default class StickyHeader {
  private CLASS_HANDLER: string = 'js-stickyHeader';
  private CLASS_SECTION_LOGO: string = 'js-stickyHeaderSectionLogo';
  private CLASS_HEADER_ELEVATED: string = 'header_elevated';
  private CLASS_LOCATION_BUTTON_HIDE: string = 'js-location-btn_hide';
  private ID_LOCATION_BTN_SEARCH: string = 'lc-btn-2';

  private headerEl: HTMLElement;
  private hiddenEl: HTMLElement;
  private hiddenLocationBtn: HTMLElement;

  constructor() {
    this.headerEl = document.querySelector(`.${this.CLASS_HANDLER}`);
    if (!this.headerEl) {
      return;
    }
    this.hiddenEl = document.querySelector(`.${this.CLASS_SECTION_LOGO}`);
    this.hiddenLocationBtn = document.getElementById(
      `${this.ID_LOCATION_BTN_SEARCH}`
    );
    this.attachEvents();
  }

  private attachEvents(): void {
    fromEvent(window, 'scroll').subscribe((e: Event) => {
      this.updateHeaderPosition();
    });
  }

  private updateHeaderPosition(): void {
    const scrollTop = window.scrollY;
    const hiddenElHeight = this.hiddenEl.clientHeight + 5;
    if (scrollTop > 0) {
      this.headerEl.style.top = `-${hiddenElHeight}px`;

      scrollTop > hiddenElHeight
        ? this.hiddenLocationBtn.classList.remove(
            this.CLASS_LOCATION_BUTTON_HIDE
          )
        : this.hiddenLocationBtn.classList.add(this.CLASS_LOCATION_BUTTON_HIDE);

      scrollTop > hiddenElHeight
        ? this.headerEl.classList.add(this.CLASS_HEADER_ELEVATED)
        : this.headerEl.classList.remove(this.CLASS_HEADER_ELEVATED);
    } else this.headerEl.style.top = '';
  }
}

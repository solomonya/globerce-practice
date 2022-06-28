import { fromEvent } from 'rxjs';

export default class SearchInput {
  private CLASS_SEARCH_INPUT = 'js-search__input';
  private CLASS_SEARCH_ICON = 'js-search__search-icon';
  private CLASS_SEARCH_ICON_FOCUS = 'search__search-icon_focus';
  private ID_LOCATION_BTN = 'lc-btn-2';
  private CLASS_SEARCH_CANCEL_BTN = 'js-search__cancel';
  private CLASS_SEARCH_CLEAR_BTN = 'js-search__clear';

  private searchEl: HTMLInputElement;
  private searchIcon: SVGAElement;
  private hiddenLocationBtn: HTMLElement;
  private searchCancelBtn: HTMLElement;
  private searchClearBtn: HTMLButtonElement;

  constructor() {
    this.searchEl = document.querySelector(`.${this.CLASS_SEARCH_INPUT}`);
    if (!this.searchEl) return;
    this.searchIcon = document.querySelector(`.${this.CLASS_SEARCH_ICON}`);
    this.hiddenLocationBtn = document.getElementById(`${this.ID_LOCATION_BTN}`);
    this.searchCancelBtn = document.querySelector(
      `.${this.CLASS_SEARCH_CANCEL_BTN}`
    );
    this.searchClearBtn = document.querySelector(
      `.${this.CLASS_SEARCH_CLEAR_BTN}`
    );
    this.attachEvents();
  }

  private attachEvents(): void {
    fromEvent(this.searchEl, 'focus').subscribe((e: Event) => {
      this.recolorizeIcon();
      if (this.hiddenLocationBtn) this.hideLocationBtn();
      this.showCancelButton();
    });

    fromEvent(this.searchEl, 'blur').subscribe((e: Event) => {
      this.returnColorIcon();
    });

    fromEvent(this.searchEl, 'input').subscribe((e: Event) => {
      this.defineClearButtonState();
    });

    fromEvent(this.searchCancelBtn, 'click').subscribe((e: Event) => {
      this.removeCancelButton();
      if (this.hiddenLocationBtn) this.returnLocationBtn();
      this.searchEl.value = '';
      this.defineClearButtonState();
    });

    fromEvent(this.searchClearBtn, 'click').subscribe((e: Event) => {
      this.clearInput();
    });
  }

  private recolorizeIcon(): void {
    this.searchIcon.classList.add(this.CLASS_SEARCH_ICON_FOCUS);
  }

  private returnColorIcon(): void {
    this.searchIcon.classList.remove(this.CLASS_SEARCH_ICON_FOCUS);
  }

  private hideLocationBtn(): void {
    this.hiddenLocationBtn.classList.add('hide');
  }

  private returnLocationBtn(): void {
    this.hiddenLocationBtn.classList.remove('hide');
  }

  private showCancelButton(): void {
    this.searchCancelBtn.classList.remove('d-none');
  }

  private removeCancelButton(): void {
    this.searchCancelBtn.classList.add('d-none');
  }

  private defineClearButtonState(): void {
    if (this.searchEl.value.length > 0) {
      this.searchClearBtn.classList.remove('d-none');
    } else {
      this.searchClearBtn.classList.add('d-none');
    }
  }
  private clearInput(): void {
    this.searchEl.value = '';
    this.searchEl.focus();
    this.searchClearBtn.classList.add('d-none');
  }
}

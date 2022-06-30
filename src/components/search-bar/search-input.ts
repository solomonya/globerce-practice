import { fromEvent } from 'rxjs';

export default class SearchInput {
  private CLASS_SEARCH_INPUT = 'search__input';
  private CLASS_SEARCH_ICON = 'js-search__search-icon';
  private CLASS_SEARCH_ICON_FOCUS = 'search__search-icon_focus';
  private CLASS_SEARCH_CANCEL_BTN = 'js-modal-search__cancel';
  private CLASS_SEARCH_CLEAR_BTN = 'js-modal-search__clear';
  private CLASS_SEARCH_MODAL_WRAPPER = 'js-search-modal-wrapper';
  private CLASS_BODY_CONTENT = 'js-base__layout';
  private CLASS_MODAL_SEARCH = 'js-search-input';

  private searchEl: HTMLInputElement;
  private searchIcon: SVGAElement;
  private searchCancelBtn: HTMLElement;
  private searchClearBtn: HTMLButtonElement;
  private searchModalWrapper: HTMLElement;
  private pageBody: HTMLElement;
  private modalSearch: HTMLInputElement;

  constructor() {
    this.searchEl = document.querySelector(`.${this.CLASS_SEARCH_INPUT}`);
    if (!this.searchEl) return;
    this.searchIcon = document.querySelector(`.${this.CLASS_SEARCH_ICON}`);
    this.searchCancelBtn = document.querySelector(
      `.${this.CLASS_SEARCH_CANCEL_BTN}`
    );
    this.searchClearBtn = document.querySelector(
      `.${this.CLASS_SEARCH_CLEAR_BTN}`
    );
    this.searchModalWrapper = document.querySelector(
      `.${this.CLASS_SEARCH_MODAL_WRAPPER}`
    );
    this.pageBody = document.querySelector(`.${this.CLASS_BODY_CONTENT}`);
    this.modalSearch = document.querySelector(`.${this.CLASS_MODAL_SEARCH}`);
    this.attachEvents();
  }

  private attachEvents(): void {
    fromEvent(this.searchEl, 'focus').subscribe((e: Event) => {
      this.showSearchModal();
      this.modalSearch.focus();
      this.searchEl.blur();
    });

    fromEvent(this.modalSearch, 'focus').subscribe((e) => {
      this.recolorizeIcon();
      this.showCancelButton();
      this.blockPageScroll();
    });

    fromEvent(this.modalSearch, 'blur').subscribe((e: Event) => {
      this.returnColorIcon();
    });

    fromEvent(this.modalSearch, 'input').subscribe((e: Event) => {
      this.defineClearButtonState();
    });

    fromEvent(this.searchCancelBtn, 'click').subscribe((e: Event) => {
      this.removeCancelButton();
      this.modalSearch.value = '';
      this.defineClearButtonState();
      this.removeSearchModal();
      this.returnScroll();
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

  private showCancelButton(): void {
    this.searchCancelBtn.classList.remove('d-none');
  }

  private removeCancelButton(): void {
    this.searchCancelBtn.classList.add('d-none');
  }

  private defineClearButtonState(): void {
    if (this.modalSearch.value.length > 0) {
      this.searchClearBtn.classList.remove('d-none');
    } else {
      this.searchClearBtn.classList.add('d-none');
    }
  }
  private clearInput(): void {
    this.modalSearch.value = '';
    this.modalSearch.focus();
    this.searchClearBtn.classList.add('d-none');
  }

  private showSearchModal() {
    this.searchModalWrapper.classList.remove('d-none');
  }

  private removeSearchModal() {
    this.searchModalWrapper.classList.add('d-none');
  }

  private blockPageScroll() {
    this.pageBody.classList.add('lock-scroll');
  }

  private returnScroll() {
    this.pageBody.classList.remove('lock-scroll');
  }
}

import { fromEvent } from 'rxjs';

export default class SearchInput {
  private CLASS_SEARCH_INPUT = 'js-search__input';
  private CLASS_SEARCH_ICON = 'js-search__search-icon';
  private CLASS_SEARCH_ICON_FOCUS = 'search__search-icon_focus';
  private ID_LOCATION_BTN = 'lc-btn-2';
  private CLASS_SEARCH_CANCEL_BTN = 'js-search__cancel';
  private CLASS_SEARCH_CLEAR_BTN = 'js-search__clear';
  private CLASS_SEARCH_MODAL_WRAPPER = 'js-search-modal-wrapper';
  private CLASS_BODY_CONTENT = 'js-base__layout';
  private CLASS_BODY_HEADER = 'js-base-layout__header';
  private CLASS_STICKY_LOGO = 'js-stickyHeaderSectionLogo';

  private searchEl: HTMLInputElement;
  private searchIcon: SVGAElement;
  private hiddenLocationBtn: HTMLElement;
  private searchCancelBtn: HTMLElement;
  private searchClearBtn: HTMLButtonElement;
  private searchModalWrapper: HTMLElement;
  private pageBody: HTMLElement;
  private header: HTMLElement;
  private stickyHeaderlogo: HTMLElement;

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
    this.searchModalWrapper = document.querySelector(
      `.${this.CLASS_SEARCH_MODAL_WRAPPER}`
    );

    this.header = document.querySelector(`.${this.CLASS_BODY_HEADER}`);

    this.pageBody = document.querySelector(`.${this.CLASS_BODY_CONTENT}`);
    this.stickyHeaderlogo = document.querySelector(
      `.${this.CLASS_STICKY_LOGO}`
    );
    this.attachEvents();
  }

  private attachEvents(): void {
    fromEvent(this.searchEl, 'focus').subscribe((e: Event) => {
      this.recolorizeIcon();
      if (this.hiddenLocationBtn) this.hideLocationBtn();
      this.showCancelButton();
      this.showSearchModal();
      this.blockPageScroll();
      this.removeHeaderShadow();
      if (this.stickyHeaderlogo) {
        this.removeStickyHeaderLogo();
      }
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
      this.removeSearchModal();
      this.returnScroll();
      this.returnStickyHeaderLogo();
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

  private removeHeaderShadow() {
    this.header.classList.remove('base-layout__header_elevated');
  }

  private removeStickyHeaderLogo() {
    this.stickyHeaderlogo.classList.add('d-none');
  }

  private returnStickyHeaderLogo() {
    this.stickyHeaderlogo.classList.remove('d-none');
  }
}

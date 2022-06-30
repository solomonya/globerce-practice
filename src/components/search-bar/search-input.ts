import { fromEvent } from 'rxjs';

export default class SearchInput {
  private CLASS_SEARCH_INPUT = 'search__input';
  private CLASS_SEARCH_MODAL_WRAPPER = 'js-search-modal-wrapper';
  private CLASS_MODAL_SEARCH = 'js-search-input';

  private searchEl: HTMLInputElement;
  private searchModalWrapper: HTMLElement;
  private modalSearch: HTMLInputElement;

  constructor() {
    this.searchEl = document.querySelector(`.${this.CLASS_SEARCH_INPUT}`);
    if (!this.searchEl) return;
    this.searchModalWrapper = document.querySelector(
      `.${this.CLASS_SEARCH_MODAL_WRAPPER}`
    );
    this.modalSearch = document.querySelector(`.${this.CLASS_MODAL_SEARCH}`);
    this.attachEvents();
  }

  private attachEvents(): void {
    fromEvent(this.searchEl, 'focus').subscribe((e: Event) => {
      this.showSearchModal();
      this.modalSearch.focus();
      this.searchEl.blur();
    });
  }

  private showSearchModal() {
    this.searchModalWrapper.classList.remove('d-none');
  }
}

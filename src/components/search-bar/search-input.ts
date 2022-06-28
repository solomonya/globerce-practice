import { fromEvent } from 'rxjs';

export default class SearchInput {
  private CLASS_SEARCH_INPUT = 'search__input';
  private searchEl: HTMLInputElement;

  constructor() {
    this.searchEl = document.querySelector(`.${this.CLASS_SEARCH_INPUT}`);

    if (!this.searchEl) {
      return;
    }
    this.attachEvents();
  }

  private attachEvents(): void {
    fromEvent(window, 'scroll').subscribe((e: Event) => {
      this.resizeInputEl();
    });
  }

  private resizeInputEl() {}
}

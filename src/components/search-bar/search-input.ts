import { fromEvent, merge, debounceTime } from 'rxjs';

export default class SearchInput {
  private CLASS_SEARCH_INPUT = 'js-search__input';
  private CLASS_MODAL_SEARCH = 'js-search__input-modal';
  private CLASS_SEARCH_CLEAR = 'js-search__clear';
  private CLASS_SEARCH_CANCEL = 'js-search__cancel';
  private CLASS_DISPLAY_NONE = 'd-none';
  private CLASS_SEARCH_ICON = 'js-search__search-icon';
  private searchEl: HTMLInputElement;
  private searchClearBtn: HTMLElement;
  private searchCancelBtn: HTMLButtonElement;
  private modalSearch: HTMLInputElement;
  private searchIcon: SVGAElement;

  constructor() {
    this.searchEl = document.querySelector(`.${this.CLASS_SEARCH_INPUT}`);
    if (!this.searchEl) return;
    this.searchClearBtn = document.querySelector(`.${this.CLASS_SEARCH_CLEAR}`);
    this.searchCancelBtn = document.querySelector(
      `.${this.CLASS_SEARCH_CANCEL}`
    );
    this.searchIcon = document.querySelector(`.${this.CLASS_SEARCH_ICON}`);
    this.modalSearch = document.querySelector(`.${this.CLASS_MODAL_SEARCH}`);

    this.attachEvents();

    console.log(this.searchEl);
    console.log(this.searchClearBtn);
  }

  private attachEvents(): void {
    fromEvent(this.searchEl, 'focus').subscribe((e: Event) => {
      this.showCancelBtn();
      this.colorizeSearchIcon();
      this.emitEventShowModal();
      this.modalSearch.focus();
    });

    fromEvent(this.modalSearch, 'blur').subscribe((e: Event) => {
      this.returnSearchIconColor();
    });

    fromEvent(this.modalSearch, 'focus').subscribe((e: Event) => {
      this.colorizeSearchIcon();
    });

    fromEvent(this.searchCancelBtn, 'click').subscribe((e: Event) => {
      this.modalSearch.value = '';
      this.defineClearBtnState();
      this.emitEventCancel();
    });

    merge(
      fromEvent(this.modalSearch, 'input'),
      fromEvent(this.modalSearch, 'change')
    )
      .pipe(debounceTime(500))
      .subscribe((e) => {
        this.defineClearBtnState();
        this.emitEventInputChange();
      });

    fromEvent(this.searchClearBtn, 'click').subscribe((e: Event) => {
      this.clearInput();
    });
  }
  private emitEventShowModal(): void {
    this.searchEl.dispatchEvent(
      new CustomEvent('show-modal', {
        bubbles: true,
        composed: true,
      })
    );
  }
  private emitEventCancel(): void {
    this.searchEl.dispatchEvent(
      new CustomEvent('cancel', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitEventInputChange(): void {
    const event = new CustomEvent('input-change', {
      bubbles: true,
      composed: true,
      detail: {
        value: this.modalSearch.value,
      },
    });
    this.modalSearch.dispatchEvent(event);
  }

  private showCancelBtn(): void {
    this.searchCancelBtn.classList.remove(`${this.CLASS_DISPLAY_NONE}`);
  }

  private colorizeSearchIcon(): void {
    this.searchIcon.classList.add('search__search-icon_focus');
  }

  private returnSearchIconColor(): void {
    this.searchIcon.classList.remove('search__search-icon_focus');
  }

  private defineClearBtnState(): void {
    this.modalSearch.value.length > 0
      ? this.searchClearBtn.classList.remove('d-none')
      : this.searchClearBtn.classList.add('d-none');
  }

  private clearInput(): void {
    this.modalSearch.value = '';
    this.defineClearBtnState();
    this.modalSearch.focus();
  }
}

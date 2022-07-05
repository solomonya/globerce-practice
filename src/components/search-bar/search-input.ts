import { fromEvent, merge, debounceTime } from 'rxjs';

export default class SearchInput {
  private CLASS_SEARCH_FORM = 'js-search-form';
  private CLASS_SEARCH_INPUT = 'js-search__input';
  private CLASS_SEARCH_CLEAR = 'js-search__clear';
  private CLASS_SEARCH_CANCEL = 'js-search__cancel';
  private CLASS_DISPLAY_NONE = 'd-none';
  private CLASS_SEARCH_ICON = 'js-search__search-icon';

  private searchForm: HTMLFormElement;
  private searchEl: HTMLElement;
  private searchInputEl: HTMLInputElement;
  private searchClearBtn: HTMLElement;
  private searchCancelBtn: HTMLButtonElement;
  private searchIcon: SVGAElement;

  constructor(searchEl: HTMLElement) {
    this.searchForm = document.querySelector(`.${this.CLASS_SEARCH_FORM}`);
    this.searchEl = searchEl;
    this.searchInputEl = this.searchEl.querySelector(
      `.${this.CLASS_SEARCH_INPUT}`
    );
    this.searchClearBtn = this.searchEl.querySelector(
      `.${this.CLASS_SEARCH_CLEAR}`
    );
    this.searchCancelBtn = this.searchEl.querySelector(
      `.${this.CLASS_SEARCH_CANCEL}`
    );
    this.searchIcon = this.searchEl.querySelector(`.${this.CLASS_SEARCH_ICON}`);
    console.log(this.searchInputEl);
    this.attachEvents();
  }

  public clearInput(dispatchEvent = false): void {
    this.searchInputEl.value = '';
    this.defineClearBtnState();
    if (dispatchEvent) {
      this.emitEventInputChange();
    }
    this.searchInputEl.focus();
  }

  private attachEvents(): void {
    // fromEvent(this.searchI, 'submit').subscribe((e: Event) => {
    //   // e.preventDefault();
    // });

    fromEvent(this.searchInputEl, 'focus').subscribe((e: Event) => {
      this.handleInputFocus(e);
    });

    fromEvent(this.searchCancelBtn, 'click').subscribe((e: Event) => {
      this.emitEventCancel();
    });

    fromEvent(this.searchClearBtn, 'click').subscribe((e: Event) => {
      this.clearInput(true);
    });

    merge(
      fromEvent(this.searchInputEl, 'change'),
      fromEvent(this.searchInputEl, 'input')
    )
      .pipe(debounceTime(500))
      .subscribe((e: Event) => {
        this.handleInputChange(e);
      });

    fromEvent(this.searchInputEl, 'blur').subscribe((e: Event) => {
      this.handleInputBlur(e);
    });
  }

  public getInputValue(): string {
    return this.searchInputEl.value;
  }

  public setInputValue(value: string): void {
    this.searchInputEl.value = value;
  }

  public focusInput(): void {
    this.showCancelBtn();
    this.colorizeSearchIcon();
    this.searchInputEl.focus();
  }

  protected handleInputFocus(e: Event): void {
    this.focusInput();
    this.emitEventInputFocus();
  }

  private handleInputChange(e?: Event) {
    this.defineClearBtnState();
    this.emitEventInputChange();
  }

  private handleInputBlur(e: Event) {
    this.returnSearchIconColor();
    this.emitEventInputBlur();
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
    });
    this.searchEl.dispatchEvent(event);
  }

  private emitEventInputFocus(): void {
    const event = new CustomEvent('input-focus', {
      bubbles: true,
      composed: true,
    });
    this.searchEl.dispatchEvent(event);
  }

  private emitEventInputBlur(): void {
    const event = new CustomEvent('input-blur', {
      bubbles: true,
      composed: true,
    });
    this.searchEl.dispatchEvent(event);
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
    this.searchInputEl.value.length > 0
      ? this.searchClearBtn.classList.remove('d-none')
      : this.searchClearBtn.classList.add('d-none');
  }
}

import axios, { AxiosResponse } from 'axios';
import { fromEvent } from 'rxjs';
import SearchInput from '../search-bar/search-input';
import {
  SearchItem,
  ITEMS,
  TItemSearch,
  TItemHistory,
  TItemHot,
} from './modal-types';

export default class SearchModal {
  private CLASS_BODY = 'js-base__layout';
  private CLASS_CLEAR_HISTORY_BTN = 'js-clear-history-btn';
  private CLASS_MODAL_CONTAINER = 'js-search-modal-container';
  private CLASS_SEARCH = 'js-modal-search';

  private modalEl: HTMLElement;
  private pageBody: HTMLElement;
  private clearHistoryBtn: HTMLButtonElement;
  private searchModalContainer: HTMLUListElement;
  private searchEl: HTMLElement;
  private search: SearchInput;
  private isOpen: boolean = false;

  constructor(modalEl: HTMLElement) {
    this.modalEl = modalEl;
    this.searchEl = this.modalEl.querySelector(`.${this.CLASS_SEARCH}`);
    this.search = new SearchInput(this.searchEl);
    this.pageBody = document.querySelector(`.${this.CLASS_BODY}`);
    this.clearHistoryBtn = modalEl.querySelector(
      `.${this.CLASS_CLEAR_HISTORY_BTN}`
    );
    this.searchModalContainer = modalEl.querySelector(
      `.${this.CLASS_MODAL_CONTAINER}`
    );
    this.attachEvents();
  }

  public open(): void {
    this.showSearchModal();
    this.blockPageScroll();
    this.isOpen = true;
    this.search.clearInput(false);
    this.search.focusInput();
    this.buildSearchItems();
  }

  public close(): void {
    this.removeSearchModal();
    this.returnScroll();
    this.isOpen = false;
  }

  private attachEvents(): void {
    fromEvent(this.clearHistoryBtn, 'click').subscribe((e: Event) => {
      this.clearHistory(this.sendClearHistoryRequest());
    });

    fromEvent(this.searchModalContainer, 'click').subscribe((e) => {
      this.handleDeleteHistoryItem(e);
    });

    fromEvent(this.searchEl, 'cancel').subscribe((e: Event) => {
      this.close();
    });

    fromEvent(this.searchEl, 'input-change').subscribe(() => {
      this.buildSearchItems();
    });
  }

  private showSearchModal() {
    this.modalEl.classList.remove('d-none');
  }

  private removeSearchModal() {
    this.modalEl.classList.add('d-none');
  }

  private async buildSearchItems() {
    const searchInputValue = this.search.getInputValue();
    return await axios
      .get<Array<SearchItem>>(
        `http://localhost:3003/search-suggest/?q=${searchInputValue}`
      )
      .then((response) => response.data)
      .then((data: Array<SearchItem>) => {
        this.searchModalContainer.innerHTML = '';
        this.searchModalContainer.innerHTML = this.getItemsTemplate(data);
        if (data.find((item) => item.type === 'history') && !searchInputValue) {
          this.showClearHistoryBtn();
        } else {
          this.hideClearHistoryBtn();
        }
      });
  }

  private handleDeleteHistoryItem(e: Event): void {
    let target = e.target as HTMLElement;

    if (
      target.classList.contains('search-result__delete-btn') ||
      target.classList.contains('search-result__delete-btn-icon')
    ) {
      const deleteItem: HTMLLIElement = target.closest('li');
      const deleteItemId = Number(deleteItem.id);

      this.removeHistoryItem(deleteItemId);
    }
  }

  private blockPageScroll() {
    this.pageBody.classList.add('lock-scroll');
  }

  private returnScroll() {
    this.pageBody.classList.remove('lock-scroll');
  }

  private async sendClearHistoryRequest() {
    console.log('post request');
    const clearHistoryResponse = await axios({
      method: 'post',
      url: 'http://localhost:3003/search-history/clear/',
    });
    return clearHistoryResponse;
  }

  private clearHistory(clearResponse: Promise<AxiosResponse>) {
    clearResponse
      .then((response) => {
        if (response.status === 200) {
          this.searchModalContainer.innerHTML = '';
          this.hideClearHistoryBtn();
        }
      })
      .catch((err) => console.error(err.message));

    this.buildSearchItems();
  }

  private hideClearHistoryBtn(): void {
    this.clearHistoryBtn.classList.add('d-none');
  }
  private showClearHistoryBtn(): void {
    this.clearHistoryBtn.classList.remove('d-none');
  }

  private removeHistoryItem(id: number): void {
    this.sendRemoveHistoryItemRequest(id).then((response) => {
      if (response.status === 200) {
        const deleteItem = document.getElementById(`${id}`);
        this.searchModalContainer.removeChild(deleteItem);
      }
    });
  }

  private async sendRemoveHistoryItemRequest(id: number) {
    const removeHistoryItemResponse = await axios({
      method: 'post',
      url: `http://localhost:3003/search-history/remove/${id}`,
    });

    return removeHistoryItemResponse;
  }

  private getItemsTemplate(items: Array<SearchItem>): string {
    return items
      .map((item) => {
        switch (item.type) {
          case ITEMS.HISTORY: {
            return this.getHistoryItemsTemplate(item.items);
          }
          case ITEMS.SEARCH: {
            return this.getSearchItemsTemplate(item.items);
          }
          case ITEMS.HOT: {
            return this.getHotItemsTemplate(item.items);
          }
        }
      })
      .join('');
  }

  private getSearchItemsTemplate(items: Array<TItemSearch>): string {
    return items.map((item) => this.getSearchItemTemplate(item)).join('');
  }

  private getSearchItemTemplate(item: TItemSearch): string {
    const title = this.capitalizeFirstLetter(item.title);
    const subtitle = this.capitalizeFirstLetter(item.subtitle);
    return `
      <li class="search-result">
        <a class="search-result__link py-7 pl-20 pr-12">
          <div class="search-result__result-box">
            <span class="icon">
              <img src="../../images/icons/search.svg" />
            </span>
            <div class="search-result__title-box">
              <h5 class="search-result__title m-0">${title}</h5>
              <h6 class="search-result__subtitle m-0">${subtitle}</h6>
            </div>
          </div>
        </a>
      </li>
    `;
  }

  private getHistoryItemsTemplate(items: Array<TItemHistory>): string {
    return items.map((item) => this.getHistoryItemTemplate(item)).join('');
  }

  private getHistoryItemTemplate(item: TItemHistory): string {
    const title = this.capitalizeFirstLetter(item.title);
    return `
      <li class="search-result" id=${item.id}>
        <a class="search-result__link py-7 pl-20 pr-12">
          <div class="search-result__result-box">
            <span class="icon">
              <img src="../../images/icons/clock.svg" />
            </span>
            <div class="search-result__title-box">
              <h5 class="search-result__title m-0">${title}</h5>
            </div>
          </div>
          <button class="search-result__delete-btn">
              <span class="icon">
                <img class="search-result__delete-btn-icon" src="../../images/icons/delete-btn.svg" />
              </span>
          </button>
        </a>
      </li>
    `;
  }

  private getHotItemsTemplate(items: Array<TItemHot>): string {
    return items.map((item) => this.getHotTemplate(item)).join('');
  }
  private getHotTemplate(item: TItemHot): string {
    const title = this.capitalizeFirstLetter(item.title);
    return `
      <li class="search-result">
        <a class="search-result__link py-7 pl-20 pr-12">
          <div class="search-result__result-box">
            <span class="icon">
              <img src="../../images/icons/fair.svg" />
            </span>
            <div class="search-result__title-box">
              <h5 class="search-result__title m-0">${title} ${item.brand}</h5>
            </div>
          </div>
        </a>
      </li>
    `;
  }

  private capitalizeFirstLetter(title: string): string {
    return title.slice(0, 1).toUpperCase() + title.slice(1);
  }
}

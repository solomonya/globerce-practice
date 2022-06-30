import axios from 'axios';
import { fromEvent, identity } from 'rxjs';
import TItem from './modal';
import HistoryItem from './modal';

export default class SearchModal {
  private CLASS_SEARCH_ICON = 'js-search__search-icon';
  private CLASS_SEARCH_ICON_FOCUS = 'search__search-icon_focus';
  private CLASS_SEARCH_CANCEL_BTN = 'js-modal-search__cancel';
  private CLASS_SEARCH_CLEAR_BTN = 'js-modal-search__clear';
  private CLASS_SEARCH_MODAL_WRAPPER = 'js-search-modal-wrapper';
  private CLASS_BODY_CONTENT = 'js-base__layout';
  private CLASS_MODAL_SEARCH = 'js-search-input';
  private CLASS_CLEAR_HISTORY_BTN = 'js-clear-history-btn';
  private CLASS_MODAL_CONTAINER = 'js-search-modal-container';

  private searchIcon: SVGAElement;
  private searchCancelBtn: HTMLElement;
  private searchClearBtn: HTMLButtonElement;
  private searchModalWrapper: HTMLElement;
  private pageBody: HTMLElement;
  private modalSearch: HTMLInputElement;
  private clearHistoryBtn: HTMLButtonElement;
  private searchModalContainer: HTMLUListElement;

  private historyList: Array<TItem>;
  private items: Array<TItem>;
  private type: string;
  private title: string;
  private subtitle: string;

  constructor() {
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
    this.clearHistoryBtn = document.querySelector(
      `.${this.CLASS_CLEAR_HISTORY_BTN}`
    );
    this.searchModalContainer = document.querySelector(
      `.${this.CLASS_MODAL_CONTAINER}`
    );
    this.historyList = [];

    this.attachEvents();
    this.fillHistoryList();
  }

  private attachEvents(): void {
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

  private removeSearchModal() {
    this.searchModalWrapper.classList.add('d-none');
  }

  private blockPageScroll() {
    this.pageBody.classList.add('lock-scroll');
  }

  private returnScroll() {
    this.pageBody.classList.remove('lock-scroll');
  }

  private fillHistoryList() {
    const historyList = axios({
      method: 'get',
      url: 'http://localhost:3003/search-history/',
    });

    historyList.then((res) => this.buildHistoryList(res.data));
  }

  private buildHistoryList(historyList: HistoryItem) {
    const historyItems: HistoryItem = historyList;
    historyItems.items.forEach((item) => {
      this.buildItem(item, historyList.type);
    });
  }

  private buildItem(item: TItem, itemType: string): void {
    const searchResult = document.createElement('li');
    searchResult.className = 'search-result';

    const searchResultLink = document.createElement('a');
    searchResultLink.className = 'search-result__link py-7 pl-20 pr-12';

    searchResult.append(searchResultLink);

    const resultBox = document.createElement('div');
    resultBox.className = 'search-result__result-box';

    searchResultLink.append(resultBox);

    const spanIcon = document.createElement('span');
    spanIcon.classList.add('icon');

    const iconImg = document.createElement('img');
    const pathImage = this.identifyTypeImage(itemType);
    iconImg.src = pathImage;

    spanIcon.append(iconImg);
    resultBox.append(spanIcon);

    const titleBox = document.createElement('div');
    titleBox.className = 'search-result__title-box';
    resultBox.append(titleBox);

    const title = document.createElement('h5');
    title.className = 'search-result__title m-0';
    title.innerText = `${item.title}`;
    titleBox.append(title);

    if (item.hasOwnProperty('subtitle')) {
      const subtitle = document.createElement('h6');
      subtitle.className = 'search-result__subtitle m-0';
      subtitle.innerText = `${item.subtitle}`;
      titleBox.append(subtitle);
    }

    if (itemType === 'history') {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'search-result__delete-btn';

      const spanIcon = document.createElement('span');
      spanIcon.classList.add('icon');
      const iconImg = document.createElement('img');
      const pathImage = '../../images/icons/delete-btn.svg';
      iconImg.src = pathImage;

      spanIcon.append(iconImg);

      deleteBtn.append(spanIcon);
      searchResultLink.append(deleteBtn);
    }

    this.searchModalContainer.append(searchResult);
  }

  private identifyTypeImage(imageType: string): string {
    switch (imageType.toUpperCase()) {
      case 'HISTORY':
        return '../../images/icons/clock.svg';
      case 'SEARCH':
        return '../../images/icons/search.svg';
      case 'HOT':
        return '../../images/icons/fair.svg';
      default:
        return 'not exist type';
    }
  }
}

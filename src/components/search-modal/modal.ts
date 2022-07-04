import axios, { AxiosResponse } from 'axios';
import { debounceTime, fromEvent, map, merge } from 'rxjs';
import { TItem, SearchItems } from './modal-types';

export default class SearchModal {
  private CLASS_SEARCH_MODAL_WRAPPER = 'js-search-modal-wrapper';
  private CLASS_BODY_CONTENT = 'js-base__layout';
  private CLASS_CLEAR_HISTORY_BTN = 'js-clear-history-btn';
  private CLASS_MODAL_CONTAINER = 'js-search-modal-container';
  private searchModalWrapper: HTMLElement;
  private pageBody: HTMLElement;
  private clearHistoryBtn: HTMLButtonElement;
  private searchModalContainer: HTMLUListElement;

  private historyList: SearchItems;

  constructor() {
    this.searchModalWrapper = document.querySelector(
      `.${this.CLASS_SEARCH_MODAL_WRAPPER}`
    );
    this.pageBody = document.querySelector(`.${this.CLASS_BODY_CONTENT}`);
    this.clearHistoryBtn = document.querySelector(
      `.${this.CLASS_CLEAR_HISTORY_BTN}`
    );
    this.searchModalContainer = document.querySelector(
      `.${this.CLASS_MODAL_CONTAINER}`
    );

    this.attachEvents();
    this.buildHistoryList(this.getHistoryList());
  }

  private attachEvents(): void {
    // fromEvent(this.modalSearch, 'focus').subscribe((e) => {
    //   this.blockPageScroll();
    // });

    // merge(
    //   fromEvent(this.modalSearch, 'input'),
    //   fromEvent(this.modalSearch, 'change')
    // )
    //   .pipe(
    //     map((e: Event) => {
    //       return this.modalSearch.value;
    //     }),
    //     debounceTime(500)
    //   )
    //   .subscribe((value) => {
    //     this.searchModalContainer.innerHTML = '';
    //     this.removeClearHistoryBtn();
    //     this.searchItems(this.sendSearchItemsRequest(value));
    //   });

    fromEvent(this.clearHistoryBtn, 'click').subscribe((e: Event) => {
      this.clearHistory(this.sendClearHistoryRequest());
    });

    fromEvent(this.searchModalContainer, 'click').subscribe((e) => {
      let target = <HTMLElement>e.target;

      if (
        target.classList.contains('search-result__delete-btn') ||
        target.classList.contains('search-result__delete-btn-icon')
      ) {
        const deleteItem: HTMLLIElement = target.closest('li');
        const deleteItemId = Number(deleteItem.id);

        this.removeHistoryItem(deleteItemId);
      }
    });

    fromEvent(document, 'show-modal').subscribe((e: Event) => {
      this.showSearchModal();
      this.blockPageScroll();
    });

    fromEvent(document, 'cancel').subscribe((e: Event) => {
      this.removeSearchModal();
      this.returnScroll();
    });

    fromEvent(document, 'input-change').subscribe(
      (e: CustomEvent<{ value: string }>) => {
        //handle input change
        console.log(e.detail.value);
      }
    );
  }

  private async sendSearchItemsRequest(searchText: string) {
    return axios.get<Array<SearchItems>>(
      `http://localhost:3003/search-suggest/?q=${searchText}`
    );
  }

  private showSearchModal() {
    this.searchModalWrapper.classList.remove('d-none');
  }

  private removeSearchModal() {
    this.searchModalWrapper.classList.add('d-none');
  }

  private searchItems(
    searchItemsResponse: Promise<AxiosResponse<Array<SearchItems>>>
  ) {
    searchItemsResponse
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        for (const group of data) {
          this.drawItemsList(group.items, group.type);
        }
      });
  }

  private blockPageScroll() {
    this.pageBody.classList.add('lock-scroll');
  }

  private returnScroll() {
    this.pageBody.classList.remove('lock-scroll');
  }

  private async getHistoryList() {
    console.log('get request');
    const historyList = await axios({
      method: 'get',
      url: 'http://localhost:3003/search-history/',
    });

    return historyList;
  }

  private async sendClearHistoryRequest() {
    console.log('post request');
    const clearHistoryResponse = await axios({
      method: 'post',
      url: 'http://localhost:3003/search-history/clear/',
    });
    return clearHistoryResponse;
  }

  private clearHistory(clearResponse: Promise<any>) {
    clearResponse
      .then((response) => {
        if (response.status === 200) {
          this.searchModalContainer.innerHTML = '';
          this.removeClearHistoryBtn();
        }
      })
      .catch((err) => console.error(err.message));

    this.buildHistoryList(this.getHistoryList());
  }

  private removeClearHistoryBtn(): void {
    this.clearHistoryBtn.classList.add('d-none');
  }
  private returnClearHistoryBtn(): void {
    this.clearHistoryBtn.classList.remove('d-none');
  }

  private buildHistoryList(respone: Promise<any>) {
    respone
      .then((response) => response.data)
      .then((responseData) => this.fillHistoryList(responseData));
  }

  private updateHistoryList(response: Promise<any>) {
    response
      .then((response) => response.data)
      .then((data) => {
        this.historyList = data;
        console.log(this.historyList);
      });
  }

  private removeHistoryItem(id: number): void {
    this.sendRemoveHistoryItemRequest(id);
    this.updateHistoryList(this.getHistoryList());
    const deleteItem = document.getElementById(`${id}`);
    this.searchModalContainer.removeChild(deleteItem);
  }

  private defineClearHistoryBtnState(): void {
    this.historyList.items.length === 0
      ? this.removeClearHistoryBtn()
      : this.returnClearHistoryBtn();
  }

  private async sendRemoveHistoryItemRequest(id: number) {
    const removeHistoryItemResponse = await axios({
      method: 'post',
      url: `http://localhost:3003/search-history/remove/${id}`,
    });

    return removeHistoryItemResponse;
  }

  private fillHistoryList(data: SearchItems) {
    this.historyList = data;
    console.log(this.historyList);
    this.drawItemsList(this.historyList.items, this.historyList.type);
  }

  private drawItemsList(drawItems: Array<TItem>, type: string) {
    drawItems.forEach((item) => {
      this.buildItem(item, type);
    });
  }

  private buildItem(item: TItem, itemType: string): void {
    const searchResult = document.createElement('li');
    searchResult.className = 'search-result';
    searchResult.id = `${item.id}`;

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
    const titleText =
      itemType === 'hot' ? `${item.title} ${item.brand}` : item.title;
    title.className = 'search-result__title m-0';
    title.innerText = titleText;
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
      iconImg.className = 'search-result__delete-btn-icon';

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

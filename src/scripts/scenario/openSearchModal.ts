import { fromEvent } from 'rxjs';
import SearchModal from '../../components/search-modal/modal';

export default class OpenSearchModal {
  private CLASS_HANDLER: string = 'js-open-search-modal-handler';
  private CLASS_MODAL: string = 'js-search-modal';

  private handlerEl: HTMLElement;
  private modalEl: HTMLElement;
  private modal: SearchModal;

  constructor() {
    this.handlerEl = document.querySelector(`.${this.CLASS_HANDLER}`);
    this.modalEl = document.querySelector(`.${this.CLASS_MODAL}`);
  }

  public init() {
    if (!(this.handlerEl || this.modalEl)) {
      return;
    }
    this.modal = new SearchModal(this.modalEl);
    this.attachEvent();
  }

  private attachEvent() {
    fromEvent(this.handlerEl, 'click').subscribe(() => {
      this.openModal();
    });
  }

  private openModal(): void {
    this.modal.open();
  }
}

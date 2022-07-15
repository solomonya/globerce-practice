import { fromEvent } from 'rxjs';

export default class BottomModal {
  private CLASS_MODAL_HEADER: string = 'js-modalHeader';
  private CLASS_MODAL_CONTAINER: string = 'js-modalContainer';
  private CLASS_MODAL_CLOSE: string = 'js-modalCloseBtn';

  private modalWrapper: HTMLDivElement;
  private modalHeader: HTMLElement;
  private modalContainer: HTMLElement;
  private modalCloseBtn: HTMLButtonElement;

  constructor(modalWrapper: HTMLDivElement) {
    this.modalWrapper = modalWrapper;
    this.modalHeader = this.modalWrapper.querySelector(
      `.${this.CLASS_MODAL_HEADER}`
    );
    this.modalContainer = this.modalWrapper.querySelector(
      `.${this.CLASS_MODAL_CONTAINER}`
    );
    this.modalCloseBtn = this.modalHeader.querySelector(
      `.${this.CLASS_MODAL_CLOSE}`
    );
  }

  public open() {
    this.modalWrapper.classList.add('modal_open');
    this.attachEvents();
  }

  public close() {
    this.modalContainer.classList.remove('modal_open');
  }

  private attachEvents() {
    fromEvent(this.modalCloseBtn, 'click').subscribe(() => {
      this.close();
    });
  }
}

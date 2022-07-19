import { fromEvent } from 'rxjs';
import { returnBodyScroll, blockBodyScroll } from '../bodyEl/scrollBehavior';

export default class BottomModal {
  private CLASS_MODAL_HEADER: string = 'js-modalHeader';
  private CLASS_MODAL_CONTAINER: string = 'js-modalBody';
  private CLASS_MODAL_CLOSE: string = 'js-modalCloseBtn';

  private modalWrapper: HTMLDivElement;
  private modalHeader: HTMLElement;
  private modalContainer: HTMLElement;
  private modalCloseBtn: HTMLButtonElement;

  constructor(modalWrapper: HTMLDivElement) {
    if (!modalWrapper) {
      return;
    }
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
    blockBodyScroll();
    this.attachEvents();
  }

  public close() {
    this.modalWrapper.classList.remove('modal_open');
    returnBodyScroll();
  }

  public getModalWrapper(): HTMLDivElement {
    return this.modalWrapper;
  }

  private attachEvents() {
    fromEvent(this.modalCloseBtn, 'click').subscribe(() => {
      this.close();
    });
  }
}

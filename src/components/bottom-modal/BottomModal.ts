import { fromEvent } from 'rxjs';
import { returnBodyScroll, blockBodyScroll } from '../bodyEl/scrollBehavior';
import { filter, map } from 'rxjs/operators';

export default class BottomModal {
  private CLASS_MODAL_HEADER: string = 'js-modalHeader';
  private CLASS_MODAL_CONTAINER_CLOSE_ANIM: string = 'modal__container_close';
  private CLASS_MODAL_CONTAINER: string = 'js-modalContainer';
  private CLASS_MODAL_CLOSE: string = 'js-modalCloseBtn';
  private CLASS_MODAL_WRAPPER: string = 'js-modalWrapper';

  private modalWrapper: HTMLDivElement;
  private modalHeader: HTMLElement;
  private modalContainer: HTMLElement;
  private modalCloseBtn: HTMLButtonElement;

  constructor(modalWrapper: HTMLDivElement) {
    if (!modalWrapper) {
      return;
    }
    this.modalWrapper = modalWrapper;
    this.modalHeader = this.modalWrapper.querySelector(`.${this.CLASS_MODAL_HEADER}`);
    this.modalContainer = this.modalWrapper.querySelector(`.${this.CLASS_MODAL_CONTAINER}`);
    this.modalCloseBtn = this.modalHeader.querySelector(`.${this.CLASS_MODAL_CLOSE}`);
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

    fromEvent(this.modalWrapper, 'click')
      .pipe(
        filter((e: Event) => {
          const target = e.target as HTMLElement;
          return target.classList.contains(this.CLASS_MODAL_WRAPPER);
        })
      )
      .subscribe(() => this.close());
  }
}

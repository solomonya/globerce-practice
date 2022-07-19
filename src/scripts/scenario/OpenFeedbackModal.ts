import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import FeedbackModal from '../../components/feedback-modal/FeedbackModal';

export default class OpenFeedbackModal {
  private CLASS_FEEDBACK_MODAL: string = 'js-feedbackModal';
  private CLASS_FEEDBACK_SECTION: string = 'js-feedbackSection';
  private CLASS_FEEDBACK_LIST: string = 'js-feedbackList';
  private CLASS_FEEDBACK_OPEN_BTN: string = 'js-feedbackOpenFullText';

  private feedbackSection: HTMLElement;
  private feedbackModalEl: HTMLDivElement;
  private feedbackListEl: HTMLUListElement;
  private feedbackModal: FeedbackModal;

  constructor() {
    this.feedbackSection = document.querySelector(
      `.${this.CLASS_FEEDBACK_SECTION}`
    );

    if (!this.feedbackSection) {
      return;
    }

    this.feedbackModalEl = this.feedbackSection.querySelector(
      `.${this.CLASS_FEEDBACK_MODAL}`
    );
    this.feedbackListEl = this.feedbackSection.querySelector(
      `.${this.CLASS_FEEDBACK_LIST}`
    );
    this.feedbackModal = new FeedbackModal(this.feedbackModalEl);
  }

  public init() {
    if (!this.feedbackSection) {
      return;
    }

    this.dispatchEvent();
  }

  private dispatchEvent() {
    fromEvent(this.feedbackListEl, 'click')
      .pipe(
        filter((e) => {
          const target = e.target as HTMLElement;
          return Boolean(this.getItemByTarget(target));
        }),
        map((e) => this.getItemByTarget(e.target as HTMLElement))
      )
      .subscribe((fullTextBtn) => {
        this.feedbackModal.open();
        this.feedbackModal.handleFulltextBtn(fullTextBtn as HTMLButtonElement);
      });
  }

  private getItemByTarget(target: HTMLElement): HTMLElement | boolean {
    if (target.classList.contains(this.CLASS_FEEDBACK_OPEN_BTN)) {
      return target;
    }
    return false;
  }
}

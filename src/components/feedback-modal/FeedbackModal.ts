import BottomModal from '../bottom-modal/BottomModal';

export default class FeedbackModal extends BottomModal {
  private CLASS_FULL_TEXT: string = 'js-feedbackText';
  private CLASS_FULL_TEXT_SOURCE: string = 'js-feedbackSourceText';

  private feedbackTextEl: HTMLParagraphElement;

  constructor(modalWrapper: HTMLDivElement) {
    super(modalWrapper);
    this.feedbackTextEl = super
      .getModalWrapper()
      .querySelector(`.${this.CLASS_FULL_TEXT}`);
  }

  public open(): void {
    super.open();
  }

  public close(): void {
    super.close();
  }

  public handleFulltextBtn(fullTextBtn: HTMLButtonElement) {
    const sourceTextEl = fullTextBtn.parentElement
      .previousElementSibling as HTMLParagraphElement;

    if (sourceTextEl.classList.contains(this.CLASS_FULL_TEXT_SOURCE)) {
      this.feedbackTextEl.innerText = sourceTextEl.innerText;
    }
  }
}

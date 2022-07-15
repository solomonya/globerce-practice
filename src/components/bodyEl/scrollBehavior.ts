const CLASS_PAGE_BODY: string = 'js-base__layout';
const bodyPage = document.querySelector(`.${CLASS_PAGE_BODY}`);

export function blockBodyScroll(): void {
  bodyPage.classList.add('lock-scroll');
}

export function returnBodyScroll(): void {
  bodyPage.classList.remove('lock-scroll');
}

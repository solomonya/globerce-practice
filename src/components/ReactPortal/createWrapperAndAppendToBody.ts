const createWrapperAndAddToBody = (wrapperId: string): HTMLDivElement => {
  const wrapperEl = document.createElement('div');
  wrapperEl.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperEl);
  return wrapperEl;
};

export default createWrapperAndAddToBody;

import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useLayoutEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import createWrapperAndAddToBody from './createWrapperAndAppendToBody';

const ReactPortal: FC<
  PropsWithChildren<{ children: ReactNode; wrapperId: string }>
> = ({ children, wrapperId }) => {
  const [wrapperEl, setWrapperEl] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId) as HTMLDivElement | null;
    let systemCreated = false;

    if (!element) {
      element = createWrapperAndAddToBody(wrapperId);
      systemCreated = true;
    }

    setWrapperEl(element);

    return () => {
      if (systemCreated && element?.parentNode)
        element.parentNode.removeChild(element);
    };
  }, [wrapperId]);

  if (wrapperEl === null) return null;

  return createPortal(children, wrapperEl);
};

export default ReactPortal;

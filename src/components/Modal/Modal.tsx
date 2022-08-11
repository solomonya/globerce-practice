import React, { FC, PropsWithChildren, ReactNode } from 'react';
import ReactPortal from '../ReactPortal/ReactPortal';
import classes from './modal.module.css';

const Modal: FC<
  PropsWithChildren<{
    children: ReactNode;
    isOpen: boolean;
  }>
> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId='react-portal-modal-wrapper'>
      <div className={classes.modal}>
        <div className={classes.modalContent}>{children}</div>
      </div>
    </ReactPortal>
  );
};

export default Modal;

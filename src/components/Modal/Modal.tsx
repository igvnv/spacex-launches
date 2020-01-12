import React, {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  ReactPortal,
} from 'react';
import { createPortal } from 'react-dom';
import { KEY_ENTER, KEY_SPACE } from 'keycode-js';

import usePortal from '../../hooks/usePortal';

type ModalProps = {
  children: ReactNode;
  onClose: (event: MouseEvent | KeyboardEvent) => void;
};

const Modal = (props: ModalProps): ReactPortal => {
  const { children, onClose } = props;
  const target = usePortal('modal');

  const onKeyDown = (e: KeyboardEvent) => {
    if ([KEY_ENTER, KEY_SPACE].includes(e.keyCode)) {
      onClose(e);
    }
  };

  return createPortal(
    <>
      <div className="modal-background" />
      <div className="modal">
        <button
          className="modal__close-button"
          type="button"
          aria-label="Close window"
          onClick={onClose}
          onKeyDown={onKeyDown}
        />
        <div className="modal__body">{children}</div>
      </div>
    </>,
    target
  );
};

export default Modal;

import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import usePortal from '../../hooks/usePortal';

const Modal = ({ children, onClose }) => {
  const target = usePortal('modal');

  return createPortal(
    (
      <>
        <div className="modal-background" />
        <div className="modal">
          <button
            className="modal__close-button"
            type="button"
            aria-label="Close window"
            onClick={onClose}
          />
          <div className="modal__body">
            {children}
          </div>
        </div>
      </>
    ),
    target,
  );
};
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

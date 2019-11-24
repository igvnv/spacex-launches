import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ children, onClose }) => (
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
);
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

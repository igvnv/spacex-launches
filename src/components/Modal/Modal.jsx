import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Modal = ({ children }) => {
  const history = useHistory();

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <>
      <div className="modal-background" />
      <div className="modal">
        <button
          className="modal__close-button"
          type="button"
          aria-label="Close window"
          onClick={back}
        />
        <div className="modal__body">
          {children}
        </div>
      </div>
    </>
  );
};
Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;

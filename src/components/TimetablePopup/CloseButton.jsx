import React from 'react';
import PropTypes from 'prop-types';
import { KEY_ENTER, KEY_SPACE } from 'keycode-js';

const CloseButton = ({ onClick }) => {
  function onKeyDown(e) {
    if (e.keyCode === KEY_ENTER || e.keyCode === KEY_SPACE) {
      onClick();
    }
  }

  return (
    <span
      role="button"
      className="launch-data-short__close"
      tabIndex="0"
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label="Close the popup"
    />
  );
};
CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;

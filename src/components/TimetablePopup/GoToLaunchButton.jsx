import React from 'react';
import PropTypes from 'prop-types';
import { KEY_ENTER, KEY_SPACE } from 'keycode-js';

const GoToLaunchButton = ({ direction, onClick }) => {
  function onKeyDown(e) {
    if (e.keyCode === KEY_ENTER || e.keyCode === KEY_SPACE) {
      onClick();
    }
  }

  return (
    <span
      role="button"
      className={`launch-data-short__show-full launch-data-short__show-full_${direction}`}
      tabIndex="0"
      aria-label="Go to the launch"
      onClick={onClick}
      onKeyDown={onKeyDown}
    />
  );
};
GoToLaunchButton.defaultProps = {
  direction: 'right',
};
GoToLaunchButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  direction: PropTypes.string,
};

export default GoToLaunchButton;

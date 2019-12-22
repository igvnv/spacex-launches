import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { KEY_ENTER, KEY_SPACE } from 'keycode-js';

const Toggle = ({ label, value, onToggle }) => {
  const [toggleValue, setToggleValue] = useState(value);

  // Toggles current component value
  const toggle = () => {
    onToggle(!toggleValue);
    setToggleValue(!toggleValue);
  };

  // Handles KeyDown event
  const onKeyDown = (e) => {
    // Toggle on Enter and Space keys only.
    if (e.keyCode === KEY_ENTER || e.keyCode === KEY_SPACE) {
      toggle();
    }
  };

  return (
    <span
      className="toggle"
      onClick={toggle}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex="0"
    >
      <span className="toggle__shifter">
        <span
          className={`toggle__shifter-point ${
            toggleValue ? 'toggle__shifter-point_on' : ''
          }`}
        />
      </span>
      {label && <span className="toggle__label">{label}</span>}
    </span>
  );
};
Toggle.defaultProps = {
  label: null,
  value: false,
};
Toggle.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

export default Toggle;

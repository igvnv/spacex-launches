import React from 'react';
import PropTypes from 'prop-types';

const LoadingError = ({ tryAgain }) => (
  <div className="loader-error">
    <p className="paragraph">Something went wrong... Please try again later.</p>

    <button
      className="loader-error__refresh-button"
      type="button"
      onClick={() => tryAgain()}
    >
      Try again
    </button>
  </div>
);
LoadingError.propTypes = {
  tryAgain: PropTypes.func.isRequired,
};

export default LoadingError;

import React from 'react';

export default () => (
  <div className="loader">
    <div className="loader-rocket">
      <span className="loader-rocket__body" />
      <span className="loader-rocket__illuminator" />
      <span className="loader-rocket__fire" />
    </div>

    <span className="loader__label">Loading...</span>
  </div>
);

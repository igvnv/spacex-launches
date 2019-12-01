import React from 'react';
import PropTypes from 'prop-types';

export const optionData = (optionId, payloads) => {
  if (optionId === 'composite fairing' && payloads.composite_fairing) {
    return payloads.composite_fairing;
  }

  return null;
};

const Payloads = ({ data }) => {
  const options = Object.keys(data)
    .filter((key) => key.startsWith('option_'))
    .map((key) => data[key]);

  return (
    <>
      {options.map((optionId, index) => (
        <div key={optionId}>
          {index > 0 && <hr className="delimiter" />}
          <PayloadOption name={optionId} data={optionData(optionId, data)} />
        </div>
      ))}
    </>
  );
};
Payloads.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export const PayloadOption = ({ name, data }) => (
  <div>
    <dl className="description-list">
      <dt className="description-list__title">Name</dt>
      <dd className="description-list__description">{name}</dd>

      {data && data.height.meters > 0 && (
        <>
          <dt className="description-list__title">Height</dt>
          <dd className="description-list__description">{`${data.height.meters} meters`}</dd>
        </>
      )}

      {data && data.diameter.meters && (
        <>
          <dt className="description-list__title">Diameter</dt>
          <dd className="description-list__description">{`${data.diameter.meters} meters`}</dd>
        </>
      )}
    </dl>
  </div>
);
PayloadOption.defaultProps = {
  data: null,
};
PayloadOption.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object),
};

export default Payloads;

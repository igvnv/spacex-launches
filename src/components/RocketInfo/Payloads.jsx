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
      {options.map((optionId) => (
        <PayloadOption key={optionId} name={optionId} data={optionData(optionId, data)} />
      ))}
    </>
  );
};
Payloads.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export const PayloadOption = ({ name, data }) => (
  <div>
    <dl>
      <dt>Name</dt>
      <dd>{name}</dd>

      {data && data.height.meters > 0 && (
        <>
          <dt>Height</dt>
          <dd>{`${data.height.meters} meters`}</dd>
        </>
      )}

      {data && data.diameter.meters && (
        <>
          <dt>Diameter</dt>
          <dd>{`${data.diameter.meters} meters`}</dd>
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

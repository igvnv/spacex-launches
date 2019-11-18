import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { fullDateFormatter } from '../../helpers/formatters';

const LaunchDataShort = ({ launch }) => {
  const location = useLocation();

  if (!launch) return null;

  return (
    <div className="launch-data-short__body">
      <h3 className="launch-data-short__title">{launch.mission_name}</h3>
      {launch.launch_success !== false ? '' : (
        <p className="launch-data-short__failure-details">
          <strong>Failure details:</strong>
          {' '}
          {launch.launch_failure_details.reason}
        </p>
      )}
      <p>
        Rocket:
        {' '}
        <Link
          to={{
            pathname: `/catalog/rockets/${launch.rocket.rocket_id}`,
            state: { background: location },
          }}
        >
          {launch.rocket.rocket_name}
        </Link>
      </p>
      <p>
        {fullDateFormatter.format(new Date(launch.launch_date_utc))}
      </p>
      <p>
        {launch.details}
      </p>
    </div>
  );
};
LaunchDataShort.defaultProps = {
  launch: null,
};
LaunchDataShort.propTypes = {
  launch: PropTypes.instanceOf(Object),
};

export default LaunchDataShort;

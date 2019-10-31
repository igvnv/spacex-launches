import React from 'react';
import PropTypes from 'prop-types';

import { fullDateTimeFormatter } from '../../helpers/formatters';

/* eslint camelcase: 0 */
function LaunchData({
  launch_success, rocket, launch_site, launch_date_local,
}) {
  const date = new Date(launch_date_local);

  return (
    <div>
      <dl>
        <dt>Success</dt>
        {launch_success === null && <dd>n/a</dd>}
        {launch_success !== null && <dd>{launch_success ? 'Yes' : 'No'}</dd>}

        <dt>Rocket</dt>
        <dd>{rocket.rocket_name}</dd>

        <dt>Launch from</dt>
        <dd>{launch_site.site_name}</dd>

        <dt>Launch date (local)</dt>
        <dd>{ fullDateTimeFormatter.format(date) }</dd>
      </dl>
    </div>
  );
}

LaunchData.defaultProps = {
  launch_success: null,
};

LaunchData.propTypes = {
  launch_date_local: PropTypes.string.isRequired,
  launch_site: PropTypes.shape({
    site_name: PropTypes.string.isRequired,
  }).isRequired,
  launch_success: PropTypes.bool,
  rocket: PropTypes.shape({
    rocket_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LaunchData;

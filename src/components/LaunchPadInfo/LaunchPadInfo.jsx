import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchPadsIfNeeded } from '../../redux/actions/launchPads';
import { launchPadById } from '../../redux/reducers/launchPads';

export const LaunchPadInfo = ({ launchPad, launchPadId }) => {
  if (!launchPadId) throw new Error('Launch pad ID is not defined');

  return (
    <div>
      <h2>{launchPad.site_name_long}</h2>
      <dl>
        <dt>Location</dt>
        <dd>
          {`${launchPad.location.region}, ${launchPad.location.name}`}
          {', '}
          <a href={`http://www.google.com/maps/place/${launchPad.location.latitude},${launchPad.location.longitude}`}>
            show on map
          </a>
        </dd>

        <dt>Status:</dt>
        <dd>{launchPad.status}</dd>

        <dt>Vehicles launched</dt>
        <dd>{launchPad.vehicles_launched.join(', ')}</dd>

        <dt>Attempted launches</dt>
        <dd>{launchPad.attempted_launches}</dd>

        <dt>Successful launches</dt>
        <dd>{launchPad.successful_launches}</dd>
      </dl>

      <p>{launchPad.details}</p>
      <p>
        Read more on
        {' '}
        <a href={launchPad.wikipedia}>Wikipedia</a>
      </p>
    </div>
  );
};
LaunchPadInfo.propTypes = {
  launchPad: PropTypes.instanceOf(Object).isRequired,
  launchPadId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.launchPads.state,
  launchPad: launchPadById(state.launchPads.data, ownProps.launchPadId),
});

export default withLoader(LaunchPadInfo, mapStateToProps, { fetchMethod: fetchLaunchPadsIfNeeded });

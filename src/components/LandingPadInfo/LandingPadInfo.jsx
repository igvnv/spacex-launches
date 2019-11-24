import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLandingPadsIfNeeded } from '../../redux/actions/landingPads';
import { landingPadById } from '../../redux/reducers/landingPads';
import MapLink from '../MapLink';

export const LandingPadInfo = ({ landingPad, landingPadId }) => {
  if (!landingPadId) throw new Error('Landing pad ID is not defined');

  const position = landingPad.location
    ? { lat: landingPad.location.latitude, lng: landingPad.location.longitude }
    : null;

  return (
    <div>
      <h2>{landingPad.full_name}</h2>

      <dl>
        <dt>Location</dt>
        <dd>
          {`${landingPad.location.region}, ${landingPad.location.name}`}
          {', '}
          <MapLink position={position}>show on map</MapLink>
        </dd>

        <dt>Status:</dt>
        <dd>{landingPad.status}</dd>

        <dt>Attempted landings</dt>
        <dd>{landingPad.attempted_landings}</dd>

        <dt>Successful landings</dt>
        <dd>{landingPad.successful_landings}</dd>
      </dl>

      <p>{landingPad.details}</p>
      <p>
        Read more on
        {' '}
        <a href={landingPad.wikipedia}>Wikipedia</a>
      </p>
    </div>
  );
};
LandingPadInfo.propTypes = {
  landingPad: PropTypes.instanceOf(Object).isRequired,
  landingPadId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.landingPads.state,
  landingPad: landingPadById(state.landingPads.data, ownProps.landingPadId),
});

export default withLoader(
  LandingPadInfo,
  mapStateToProps,
  { fetchMethod: fetchLandingPadsIfNeeded },
);

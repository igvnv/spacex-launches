import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLandingPadsIfNeeded } from '../../store/actions/landingPads';
import { landingPadById } from '../../store/reducers/landingPads';
import MapLink from '../MapLink';

export const LandingPadInfo = ({ landingPad, landingPadId }) => {
  if (!landingPadId) throw new Error('Landing pad ID is not defined');

  const position = landingPad.location
    ? { lat: landingPad.location.latitude, lng: landingPad.location.longitude }
    : null;

  return (
    <div>
      <h1 className="title title_level_1">{landingPad.full_name}</h1>

      <p className="paragraph">{landingPad.details}</p>

      <h2 className="title title_level_2">General information</h2>

      <dl className="description-list">
        <dt className="description-list__title">Location</dt>
        <dd className="description-list__description">
          {`${landingPad.location.region}, ${landingPad.location.name}`}
          {', '}
          <MapLink position={position}>show on map</MapLink>
        </dd>

        <dt className="description-list__title">Status:</dt>
        <dd className="description-list__description">{landingPad.status}</dd>

        <dt className="description-list__title">Attempted landings</dt>
        <dd className="description-list__description">
          {landingPad.attempted_landings}
        </dd>

        <dt className="description-list__title">Successful landings</dt>
        <dd className="description-list__description">
          {landingPad.successful_landings}
        </dd>
      </dl>

      <p className="paragraph">
        Read more on{' '}
        <a className="link" href={landingPad.wikipedia}>
          Wikipedia
        </a>
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

export default withLoader(LandingPadInfo, mapStateToProps, {
  fetchMethod: fetchLandingPadsIfNeeded,
});

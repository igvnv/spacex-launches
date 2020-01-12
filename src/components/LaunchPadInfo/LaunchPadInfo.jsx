import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchPadsIfNeeded } from '../../store/actions/launchPads';
import { launchPadById } from '../../store/reducers/launchPads';
import MapLink from '../MapLink';

export const LaunchPadInfo = ({ launchPad, launchPadId }) => {
  if (!launchPadId) throw new Error('Launch pad ID is not defined');

  const position = launchPad.location
    ? { lat: launchPad.location.latitude, lng: launchPad.location.longitude }
    : null;

  return (
    <div>
      <h1 className="title title_level_1">{launchPad.site_name_long}</h1>

      <p className="paragraph">{launchPad.details}</p>

      <h2 className="title title_level_2">General information</h2>

      <dl className="description-list">
        <dt className="description-list__title">Location</dt>
        <dd className="description-list__description">
          {`${launchPad.location.region}, ${launchPad.location.name}`}
          {', '}
          <MapLink position={position}>show on map</MapLink>
        </dd>

        <dt className="description-list__title">Status:</dt>
        <dd className="description-list__description">{launchPad.status}</dd>

        <dt className="description-list__title">Vehicles launched</dt>
        <dd className="description-list__description">
          {launchPad.vehicles_launched.join(', ')}
        </dd>

        <dt className="description-list__title">Attempted launches</dt>
        <dd className="description-list__description">
          {launchPad.attempted_launches}
        </dd>

        <dt className="description-list__title">Successful launches</dt>
        <dd className="description-list__description">
          {launchPad.successful_launches}
        </dd>
      </dl>

      <p className="paragraph">
        Read more on{' '}
        <a className="link" href={launchPad.wikipedia}>
          Wikipedia
        </a>
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

export default withLoader(LaunchPadInfo, mapStateToProps, {
  fetchMethod: fetchLaunchPadsIfNeeded,
});

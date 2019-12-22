import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchPadsIfNeeded } from '../../redux/actions/launchPads';
import { launchPadById } from '../../redux/reducers/launchPads';

export const LaunchPadInfoShort = ({ launchPad, launchPadId }) => (
  <div>
    <h2 className="title title_level_2 catalog-list__title">
      {launchPad.site_name_long}
    </h2>

    <dl className="description-list">
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

    <p>
      <Link to={`/catalog/launch_pads/${launchPadId}`} className="accent-link">
        Read more
        <span className="accent-link__arrow" />
      </Link>
    </p>
  </div>
);
LaunchPadInfoShort.propTypes = {
  launchPad: PropTypes.instanceOf(Object).isRequired,
  launchPadId: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.launchPads.state,
  launchPad: launchPadById(state.launchPads.data, ownProps.launchPadId),
});

export default withLoader(LaunchPadInfoShort, mapStateToProps, {
  fetchMethod: fetchLaunchPadsIfNeeded,
});

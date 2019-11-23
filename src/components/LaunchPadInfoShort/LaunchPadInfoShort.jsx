import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchPadsIfNeeded } from '../../redux/actions/launchPads';
import { launchPadById } from '../../redux/reducers/launchPads';

export const LaunchPadInfoShort = ({ launchPad, launchPadId }) => {
  return (
    <div>
      <h2>{launchPad.site_name_long}</h2>
      <dl>
        <dt>Status:</dt>
        <dd>{launchPad.status}</dd>

        <dt>Vehicles launched</dt>
        <dd>{launchPad.vehicles_launched.join(', ')}</dd>

        <dt>Attempted launches</dt>
        <dd>{launchPad.attempted_launches}</dd>

        <dt>Successful launches</dt>
        <dd>{launchPad.successful_launches}</dd>
      </dl>

      <p>
        <Link to={`/catalog/launch_pads/${launchPadId}`}>
          Read more!
        </Link>
      </p>
    </div>
  );
};
LaunchPadInfoShort.propTypes = {
  launchPad: PropTypes.instanceOf(Object).isRequired,
  launchPadId: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.launchPads.state,
  launchPad: launchPadById(state.launchPads.data, ownProps.launchPadId),
});

export default withLoader(
  LaunchPadInfoShort,
  mapStateToProps,
  { fetchMethod: fetchLaunchPadsIfNeeded },
);

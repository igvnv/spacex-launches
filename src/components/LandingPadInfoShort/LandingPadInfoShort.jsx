import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchLandingPadsIfNeeded } from '../../redux/actions/landingPads';
import { landingPadById } from '../../redux/reducers/landingPads';

export const LandingPadInfoShort = ({ landingPad, landingPadId }) => (
  <div>
    <h2>{landingPad.full_name}</h2>
    <dl>
      <dt>Status:</dt>
      <dd>{landingPad.status}</dd>

      <dt>Attempted landings</dt>
      <dd>{landingPad.attempted_landings}</dd>

      <dt>Successful landings</dt>
      <dd>{landingPad.successful_landings}</dd>
    </dl>

    <p>
      <Link to={`/catalog/landing_pads/${landingPadId}`}>
        Read more!
      </Link>
    </p>
  </div>
);
LandingPadInfoShort.propTypes = {
  landingPad: PropTypes.instanceOf(Object).isRequired,
  landingPadId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.landingPads.state,
  landingPad: landingPadById(state.landingPads.data, ownProps.landingPadId),
});

export default withLoader(
  LandingPadInfoShort,
  mapStateToProps,
  { fetchMethod: fetchLandingPadsIfNeeded },
);

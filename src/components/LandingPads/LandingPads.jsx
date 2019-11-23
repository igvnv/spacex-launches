import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLandingPadsIfNeeded } from '../../redux/actions/landingPads';
import LandingPadInfoShort from '../LandingPadInfoShort';

export const LandingPads = ({ landingPads }) => (
  <div>
    {landingPads.map((landingPad) => (
      <div key={landingPad.id}>
        <LandingPadInfoShort landingPadId={landingPad.id} />
      </div>
    ))}
  </div>
);
LandingPads.propTypes = {
  landingPads: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.landingPads.state,
  landingPads: state.landingPads.data,
});

export default withLoader(LandingPads, mapStateToProps, { fetchMethod: fetchLandingPadsIfNeeded });

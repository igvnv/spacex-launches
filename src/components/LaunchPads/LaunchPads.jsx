import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchPadsIfNeeded } from '../../redux/actions/launchPads';
import LaunchPadInfoShort from '../LaunchPadInfoShort';

export const LaunchPads = ({ launchPads }) => (
  <div>
    {launchPads.map((launchPad) => (
      <div key={launchPad.id}>
        <LaunchPadInfoShort launchPadId={launchPad.id} />
      </div>
    ))}
  </div>
);
LaunchPads.propTypes = {
  launchPads: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.launchPads.state,
  launchPads: state.launchPads.data,
});

export default withLoader(LaunchPads, mapStateToProps, { fetchMethod: fetchLaunchPadsIfNeeded });

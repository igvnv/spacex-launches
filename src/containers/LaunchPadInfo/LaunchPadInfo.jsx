import React from 'react';
import { useParams } from 'react-router-dom';

import LaunchPadInfo from '../../components/LaunchPadInfo';
import { fetchLaunchPadsIfNeeded } from '../../redux/actions/launchPads';
import withLoader from '../../hoc/withLoader';

export const LaunchPadInfoContainer = () => {
  const { launchPadId } = useParams();
  return <LaunchPadInfo launchPadId={launchPadId} />;
};

const mapStateToProps = (state) => ({
  loadingState: state.launchPads.state,
  launchPads: state.launchPads.data,
});

export default withLoader(LaunchPadInfoContainer, mapStateToProps, {
  fetchMethod: fetchLaunchPadsIfNeeded,
});

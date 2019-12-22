import React from 'react';
import { useParams } from 'react-router-dom';

import LandingPadInfo from '../../components/LandingPadInfo';
import { fetchLandingPadsIfNeeded } from '../../redux/actions/landingPads';
import withLoader from '../../hoc/withLoader';

export const LandingPadInfoContainer = () => {
  const { landingPadId } = useParams();
  return <LandingPadInfo landingPadId={landingPadId} />;
};

const mapStateToProps = (state) => ({
  loadingState: state.landingPads.state,
  landingPads: state.landingPads.data,
});

export default withLoader(LandingPadInfoContainer, mapStateToProps, {
  fetchMethod: fetchLandingPadsIfNeeded,
});

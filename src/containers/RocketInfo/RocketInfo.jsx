import React from 'react';
import { useParams } from 'react-router-dom';

import RocketInfo from '../../components/RocketInfo';
import { fetchRocketsIfNeeded } from '../../redux/actions/rockets';
import withLoader from '../../hoc/withLoader';

export const RocketInfoContainer = () => {
  const { rocketId } = useParams();
  return <RocketInfo rocketId={rocketId} />;
};

const mapStateToProps = (state) => ({
  loadingState: state.rockets.state,
  rockets: state.rockets.data,
});

export default withLoader(
  RocketInfoContainer,
  mapStateToProps,
  { fetchMethod: fetchRocketsIfNeeded },
);

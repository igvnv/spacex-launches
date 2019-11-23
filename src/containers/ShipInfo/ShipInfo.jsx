import React from 'react';
import { useParams } from 'react-router-dom';

import ShipInfo from '../../components/ShipInfo';
import { fetchShipsIfNeeded } from '../../redux/actions/ships';
import withLoader from '../../hoc/withLoader';

export const ShipInfoContainer = () => {
  const { shipId } = useParams();
  return <ShipInfo shipId={shipId} />;
};

const mapStateToProps = (state) => ({
  loadingState: state.ships.state,
  ships: state.ships.data,
});

export default withLoader(
  ShipInfoContainer,
  mapStateToProps,
  { fetchMethod: fetchShipsIfNeeded },
);

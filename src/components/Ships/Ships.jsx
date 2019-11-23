import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchShipsIfNeeded } from '../../redux/actions/ships';
import ShipInfoShort from '../ShipInfoShort';

export const Ships = ({ ships }) => (
  <div>
    {ships.map((ship) => (
      <div key={ship.ship_id}>
        <ShipInfoShort shipId={ship.ship_id} />
      </div>
    ))}
  </div>
);
Ships.propTypes = {
  ships: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.ships.state,
  ships: state.ships.data,
});

export default withLoader(Ships, mapStateToProps, { fetchMethod: fetchShipsIfNeeded });

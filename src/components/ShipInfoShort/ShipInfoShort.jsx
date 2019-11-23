import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchShipsIfNeeded } from '../../redux/actions/ships';
import { shipById } from '../../redux/reducers/ships';
import ShipCourse from '../ShipCourse';

export const ShipInfoShort = ({ ship, shipId }) => {
  if (!ship) return null;

  return (
    <div>
      <h2>{ship.ship_name}</h2>
      <dl>
        <dt>Active:</dt>
        <dd>{ship.active ? 'Yes' : 'No'}</dd>

        <dt>Status:</dt>
        <dd>
          {ship.status}
          {' '}
          <ShipCourse ship={ship} />
        </dd>

        <dt>Type</dt>
        <dd>{ship.ship_type}</dd>

        <dt>Roles</dt>
        <dd>{ship.roles.join(', ')}</dd>

        <dt>Year built</dt>
        <dd>{ship.year_built || 'N/d'}</dd>
      </dl>

      <p>
        <Link to={`/catalog/ships/${shipId}`}>
          Read more!
        </Link>
      </p>
    </div>
  );
};
ShipInfoShort.propTypes = {
  ship: PropTypes.instanceOf(Object).isRequired,
  shipId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.ships.state,
  ship: shipById(state.ships.data, ownProps.shipId),
});

export default withLoader(ShipInfoShort, mapStateToProps, { fetchMethod: fetchShipsIfNeeded });

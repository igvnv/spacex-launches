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
      <h2 className="title title_level_2 catalog-list__title">
        {ship.ship_name}
      </h2>

      <dl className="description-list">
        <dt className="description-list__title">Active:</dt>
        <dd className="description-list__description">
          {ship.active ? 'Yes' : 'No'}
        </dd>

        <dt className="description-list__title">Status:</dt>
        <dd className="description-list__description">
          {ship.status || 'N/d'} <ShipCourse ship={ship} />
        </dd>

        <dt className="description-list__title">Type</dt>
        <dd className="description-list__description">{ship.ship_type}</dd>

        <dt className="description-list__title">Roles</dt>
        <dd className="description-list__description">
          {ship.roles.join(', ')}
        </dd>

        <dt className="description-list__title">Year built</dt>
        <dd className="description-list__description">
          {ship.year_built || 'N/d'}
        </dd>
      </dl>

      <p>
        <Link to={`/catalog/ships/${shipId}`} className="accent-link">
          Read more
          <span className="accent-link__arrow" />
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

export default withLoader(ShipInfoShort, mapStateToProps, {
  fetchMethod: fetchShipsIfNeeded,
});

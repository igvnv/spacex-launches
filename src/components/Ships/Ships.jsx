import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchShipsIfNeeded } from '../../redux/actions/ships';
import ShipInfoShort from '../ShipInfoShort';
import ShipCourse from '../ShipCourse';
import MapPoints from '../MapPoints';

export const Ships = ({ ships }) => {
  const points = ships
    .filter((ship) => ship.position
      && ship.position.latitude !== null
      && ship.position.longitude != null)
    .map((ship) => ({
      id: ship.ship_id,
      title: ship.ship_name,
      position: {
        lat: ship.position.latitude,
        lng: ship.position.longitude,
      },
      description: (
        <>
          <p>
            {ship.status}
            {' '}
            <ShipCourse ship={ship} />
          </p>

          <Link to={`/catalog/ships/${ship.ship_id}`}>
            Read more!
          </Link>
        </>
      ),
    }));

  return (
    <div>
      <MapPoints points={points} />

      <div className="catalog-list">
        {ships.map((ship) => (
          <div className="catalog-list__item" key={ship.ship_id}>
            <ShipInfoShort shipId={ship.ship_id} />
          </div>
        ))}
      </div>
    </div>
  );
};
Ships.propTypes = {
  ships: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.ships.state,
  ships: state.ships.data,
});

export default withLoader(Ships, mapStateToProps, { fetchMethod: fetchShipsIfNeeded });

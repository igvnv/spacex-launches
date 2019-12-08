import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withLoader from '../../hoc/withLoader';
import { fetchShipsIfNeeded } from '../../redux/actions/ships';
import ShipInfoShort from '../../components/ShipInfoShort';
import ShipCourse from '../../components/ShipCourse';
import MapPoints from '../../components/MapPoints';
import Toggle from '../../components/Toggle';

export const Ships = ({ ships }) => {
  const [activeOnly, setActiveOnly] = useState(false);

  const filterShips = (shipsList) => {
    if (!activeOnly) return shipsList;
    return shipsList.filter((r) => r.active === true);
  };

  const points = (shipsList) => shipsList
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
      <MapPoints points={points(filterShips(ships))} />

      <div className="catalog-filter">
        <Toggle label="Active only" value={activeOnly} onToggle={setActiveOnly} />
      </div>

      <div className="catalog-list">
        {filterShips(ships).map((ship) => (
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

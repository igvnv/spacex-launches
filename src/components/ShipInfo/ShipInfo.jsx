import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchShipsIfNeeded } from '../../store/actions/ships';
import { shipById } from '../../store/reducers/ships';
import ShipCourse from '../ShipCourse';
import HeroHeader from '../HeroHeader';
import MapLink from '../MapLink';

export const ShipInfo = ({ ship, shipId }) => {
  if (!shipId) throw new Error('Ship ID is not defined');

  const position = ship.position
    ? { lat: ship.position.latitude, lng: ship.position.longitude }
    : null;

  return (
    <div>
      <HeroHeader type="water" title={ship.ship_name} photo={ship.image} />

      <h2 className="title title_level_2">General information</h2>

      <dl className="description-list">
        <dt className="description-list__title">Active:</dt>
        <dd className="description-list__description">
          {ship.active ? 'Yes' : 'No'}
        </dd>

        <dt className="description-list__title">Home port</dt>
        <dd className="description-list__description">{ship.home_port}</dd>

        <dt className="description-list__title">Status:</dt>
        <dd className="description-list__description">
          {ship.status} <ShipCourse ship={ship} />
        </dd>

        {position && (
          <>
            <dt className="description-list__title">Position:</dt>
            <dd className="description-list__description">
              <MapLink position={position}>Show on map</MapLink>
            </dd>
          </>
        )}

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

        <dt className="description-list__title">Missions</dt>
        <dd className="description-list__description">
          <ul>
            {ship.missions.map((mission) => (
              <li key={mission.name}>{mission.name}</li>
            ))}
          </ul>
        </dd>
      </dl>

      <p className="paragraph">
        <a className="link" href={ship.url}>
          More info
        </a>
      </p>
    </div>
  );
};
ShipInfo.propTypes = {
  ship: PropTypes.instanceOf(Object).isRequired,
  shipId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loadingState: state.ships.state,
  ship: shipById(state.ships.data, ownProps.shipId),
});

export default withLoader(ShipInfo, mapStateToProps, {
  fetchMethod: fetchShipsIfNeeded,
});

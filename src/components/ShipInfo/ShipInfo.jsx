import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchShipsIfNeeded } from '../../redux/actions/ships';
import { shipById } from '../../redux/reducers/ships';
import ShipCourse from '../ShipCourse';
import HeroHeader from '../HeroHeader';

export const ShipInfo = ({ ship, shipId }) => {
  if (!shipId) throw new Error('Ship ID is not defined');

  return (
    <div>
      <HeroHeader type="water" title={ship.ship_name} photo={ship.image} />

      <dl>
        <dt>Active:</dt>
        <dd>{ship.active ? 'Yes' : 'No'}</dd>

        <dt>Home port</dt>
        <dd>{ship.home_port}</dd>

        <dt>Status:</dt>
        <dd>
          {ship.status}
          {' '}
          <ShipCourse ship={ship} />
        </dd>

        {ship.position && (
          <>
            <dt>Position:</dt>
            <dd>
              <a href={`http://www.google.com/maps/place/${ship.position.latitude},${ship.position.longitude}`}>
                Show on map
              </a>
            </dd>
          </>
        )}

        <dt>Type</dt>
        <dd>{ship.ship_type}</dd>

        <dt>Roles</dt>
        <dd>{ship.roles.join(', ')}</dd>

        <dt>Year built</dt>
        <dd>{ship.year_built || 'N/d'}</dd>

        <dt>Missions</dt>
        <dd>
          <ul>
            {ship.missions.map((mission) => (
              <li key={mission.name}>
                {mission.name}
              </li>
            ))}
          </ul>
        </dd>
      </dl>

      <p>
        <a href={ship.url}>More info</a>
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

export default withLoader(ShipInfo, mapStateToProps, { fetchMethod: fetchShipsIfNeeded });

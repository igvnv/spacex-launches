import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchRocketsIfNeeded } from '../../redux/actions/rockets';
import RocketInfoShort from '../RocketInfoShort';

export const Rockets = ({ rockets }) => (
  <div className="catalog-list">
    {rockets.map((rocket) => (
      <div className="catalog-list__item" key={rocket.rocket_id}>
        <RocketInfoShort rocketId={rocket.rocket_id} />
      </div>
    ))}
  </div>
);
Rockets.propTypes = {
  rockets: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.rockets.state,
  rockets: state.rockets.data,
});

export default withLoader(Rockets, mapStateToProps, { fetchMethod: fetchRocketsIfNeeded });

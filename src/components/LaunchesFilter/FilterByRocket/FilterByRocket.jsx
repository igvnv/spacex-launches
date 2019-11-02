import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLaunchesFilterByRocketId } from '../../../redux/actions';
import { launchesByCurrentTimeline } from '../../../redux/reducers/launches';

export const FilterByRocket = ({
  launches,
  filterValue,
  setFilter,
}) => {
  const availableRockets = launches
    .map((launch) => ({ id: launch.rocket.rocket_id, name: launch.rocket.rocket_name }))
    .reduce((rockets, rocket) => {
      if (Object.keys(rockets).includes(rocket)) return rockets;
      return { ...rockets, ...{ [rocket.id]: rocket.name } };
    }, {});

  return (
    <p>
      Rocket:
      {Object.keys(availableRockets).map((rocketId) => (
        <button
          key={rocketId}
          onClick={() => setFilter(rocketId)}
          className={filterValue === rocketId ? 'filter__button filter__button_active' : 'filter__button'}
          type="button"
        >
          {availableRockets[rocketId]}
        </button>
      ))}
      {filterValue && (
        <button
          type="button"
          className="filter__button-clean"
          onClick={() => setFilter(null)}
          aria-label="Clean filter"
        />
      )}
    </p>
  );
};

FilterByRocket.defaultProps = {
  filterValue: null,
};

FilterByRocket.propTypes = {
  launches: PropTypes.instanceOf(Array).isRequired,
  filterValue: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filterValue: state.launches.filterByRocketId,
  launches: launchesByCurrentTimeline(state.launches),
});

export default connect(mapStateToProps, { setFilter: setLaunchesFilterByRocketId })(FilterByRocket);

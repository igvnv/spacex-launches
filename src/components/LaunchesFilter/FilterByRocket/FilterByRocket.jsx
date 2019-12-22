import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLaunchesFilterByRocketId } from '../../../redux/actions';
import { launchesByCurrentTimeline } from '../../../redux/reducers/launches';

export const FilterByRocket = ({ launches, filterValue, setFilter }) => {
  const availableRockets = launches
    .map((launch) => ({
      id: launch.rocket.rocket_id,
      name: launch.rocket.rocket_name,
    }))
    .reduce((rockets, rocket) => {
      if (Object.keys(rockets).includes(rocket)) return rockets;
      return { ...rockets, ...{ [rocket.id]: rocket.name } };
    }, {});

  return (
    <>
      <span className="launches-filter__title">Rocket:</span>

      <div className="launches-filter__variants">
        {Object.keys(availableRockets).map((rocketId) => (
          <button
            key={rocketId}
            onClick={() => setFilter(rocketId)}
            className={
              filterValue === rocketId
                ? 'filter-button filter-button_active'
                : 'filter-button'
            }
            type="button"
          >
            {availableRockets[rocketId]}
          </button>
        ))}
        {filterValue && (
          <button
            type="button"
            className="filter-button_clean"
            onClick={() => setFilter(null)}
            aria-label="Clean filter"
          >
            Clean filter
          </button>
        )}
      </div>
    </>
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

export default connect(mapStateToProps, {
  setFilter: setLaunchesFilterByRocketId,
})(FilterByRocket);

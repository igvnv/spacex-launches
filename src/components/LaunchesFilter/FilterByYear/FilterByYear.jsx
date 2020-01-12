import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLaunchesFilterByYear } from '../../../store/actions';
import { launchesByCurrentTimeline } from '../../../store/reducers/launches';

export const FilterByYear = ({ launches, filterValue, setFilter }) => {
  const availableLaunchesYears = launches
    .map((launch) => launch.launch_year)
    .reduce((years, year) => {
      if (years.includes(year)) return years;
      return [...years, year];
    }, []);

  // Clean filter by year when year is not in available years list
  if (filterValue && !availableLaunchesYears.includes(filterValue)) {
    setFilter(null);
  }

  return (
    <>
      <span className="launches-filter__title">Year:</span>

      <div className="launches-filter__variants">
        {availableLaunchesYears.map((year) => (
          <button
            key={year}
            onClick={() => setFilter(year)}
            className={
              filterValue === year
                ? 'filter-button filter-button_active'
                : 'filter-button'
            }
            type="button"
          >
            {year}
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

FilterByYear.defaultProps = {
  filterValue: null,
};

FilterByYear.propTypes = {
  launches: PropTypes.instanceOf(Array).isRequired,
  filterValue: PropTypes.string,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filterValue: state.launches.filterByYear,
  launches: launchesByCurrentTimeline(state.launches),
});

export default connect(mapStateToProps, { setFilter: setLaunchesFilterByYear })(
  FilterByYear
);

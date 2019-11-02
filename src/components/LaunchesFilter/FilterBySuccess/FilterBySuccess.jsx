import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLaunchesFilterBySuccess } from '../../../redux/actions';

export const FilterBySuccess = ({
  filterValue,
  setFilter,
}) => (
  <p>
    Success:
    <button
      onClick={() => setFilter(true)}
      className={filterValue === true ? 'filter__button filter__button_active' : 'filter__button'}
      aria-label="yes"
      type="button"
    >
      Yes
    </button>

    <button
      onClick={() => setFilter(false)}
      className={filterValue === false ? 'filter__button filter__button_active' : 'filter__button'}
      aria-label="no"
      type="button"
    >
      No
    </button>

    {filterValue !== null && (
      <button
        type="button"
        className="filter__button-clean"
        onClick={() => setFilter(null)}
        aria-label="Clean filter"
      />
    )}
  </p>
);

FilterBySuccess.defaultProps = {
  filterValue: null,
};

FilterBySuccess.propTypes = {
  filterValue: PropTypes.bool,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filterValue: state.launches.filterBySuccess,
});

export default connect(mapStateToProps, { setFilter: setLaunchesFilterBySuccess })(FilterBySuccess);

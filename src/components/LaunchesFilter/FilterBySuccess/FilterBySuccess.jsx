import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setLaunchesFilterBySuccess } from '../../../redux/actions';

export const FilterBySuccess = ({ filterValue, setFilter }) => (
  <>
    <span className="launches-filter__title">Success:</span>

    <div className="launches-filter__variants">
      <button
        onClick={() => setFilter(true)}
        className={
          filterValue === true
            ? 'filter-button filter-button_active'
            : 'filter-button'
        }
        aria-label="yes"
        type="button"
      >
        Yes
      </button>

      <button
        onClick={() => setFilter(false)}
        className={
          filterValue === false
            ? 'filter-button filter-button_active'
            : 'filter-button'
        }
        aria-label="no"
        type="button"
      >
        No
      </button>

      {filterValue !== null && (
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

export default connect(mapStateToProps, {
  setFilter: setLaunchesFilterBySuccess,
})(FilterBySuccess);

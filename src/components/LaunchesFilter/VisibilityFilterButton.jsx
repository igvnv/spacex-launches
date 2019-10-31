import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setLaunchesVisibilityFilter } from '../../redux/actions';

function VisibilityFilterButton({
  setFilter, filter, visibilityFilter, children,
}) {
  let className = 'button-group__button';

  if (visibilityFilter === filter) {
    className += ' button-group__button_active';
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => setFilter(filter)}
    >
      {children}
    </button>
  );
}
VisibilityFilterButton.propTypes = {
  setFilter: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  filter: PropTypes.string.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  visibilityFilter: state.launches.visibilityFilter,
});

const mapDispatchToProps = { setFilter: setLaunchesVisibilityFilter };

export default connect(mapStateToProps, mapDispatchToProps)(VisibilityFilterButton);

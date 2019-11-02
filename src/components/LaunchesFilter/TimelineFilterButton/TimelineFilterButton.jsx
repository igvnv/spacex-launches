import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setLaunchesTimeline } from '../../../redux/actions';

export function TimelineFilterButton({
  setFilter, timeline, displayedTimeline, children,
}) {
  let className = 'button-group__button';

  if (displayedTimeline === timeline) {
    className += ' button-group__button_active';
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => setFilter(timeline)}
    >
      {children}
    </button>
  );
}
TimelineFilterButton.propTypes = {
  setFilter: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  timeline: PropTypes.string.isRequired,
  displayedTimeline: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  displayedTimeline: state.launches.timeline,
});

const mapDispatchToProps = { setFilter: setLaunchesTimeline };

export default connect(mapStateToProps, mapDispatchToProps)(TimelineFilterButton);

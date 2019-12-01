import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setLaunchesTimeline } from '../../../redux/actions';

export function TimelineFilterButton({
  setFilter, timeline, displayedTimeline, children,
}) {
  let className = 'secondary-menu__link';

  if (displayedTimeline === timeline) {
    className += ' secondary-menu__link_active';
  }

  return (
    <li className="secondary-menu__item">
      <span
        role="button"
        tabIndex="0"
        className={className}
        onClick={() => setFilter(timeline)}
        onKeyDown={() => setFilter(timeline)}
      >
        {children}
      </span>
    </li>
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

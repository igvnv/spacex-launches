import React from 'react';

import { LaunchesTimeline } from '../../store/actions';
import TimelineFilterButton from './TimelineFilterButton';
import FilterByYear from './FilterByYear';
import FilterByRocket from './FilterByRocket';
import FilterBySuccess from './FilterBySuccess';

const LaunchesFilter = () => (
  <>
    <ul className="secondary-menu">
      <TimelineFilterButton timeline={LaunchesTimeline.PAST}>
        Past launches
      </TimelineFilterButton>
      <TimelineFilterButton timeline={LaunchesTimeline.ALL}>
        All launches
      </TimelineFilterButton>
      <TimelineFilterButton timeline={LaunchesTimeline.FUTURE}>
        Future launches
      </TimelineFilterButton>
    </ul>

    <div className="launches-filter">
      <FilterByYear />
      <FilterByRocket />
      <FilterBySuccess />
    </div>
  </>
);

export default LaunchesFilter;

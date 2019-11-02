import React, { useState } from 'react';

import { LaunchesTimeline } from '../../redux/actions';
import TimelineFilterButton from './TimelineFilterButton/TimelineFilterButton';
import FilterByYear from './FilterByYear/FilterByYear';
import FilterByRocket from './FilterByRocket/FilterByRocket';
import FilterBySuccess from './FilterBySuccess/FilterBySuccess';

export default function () {
  const [displayAdditionFilters, toggleAdditionalFilters] = useState(true);

  return (
    <div className="launches-filter">
      <div className="button-group">
        <TimelineFilterButton timeline={LaunchesTimeline.PAST}>
          Past launches
        </TimelineFilterButton>
        <TimelineFilterButton timeline={LaunchesTimeline.ALL}>
          All launches
        </TimelineFilterButton>
        <TimelineFilterButton timeline={LaunchesTimeline.FUTURE}>
          Future launches
        </TimelineFilterButton>
      </div>

      {!displayAdditionFilters && (
        <button
          type="button"
          onClick={() => toggleAdditionalFilters(!displayAdditionFilters)}
          className="launches-filter__show-additional-filters"
        >
          More filters!
        </button>
      )}
      {displayAdditionFilters && (
        <fieldset className="launches-filter__additional-filters additional-filters">
          <legend>Additional filters</legend>

          <FilterByYear />
          <FilterByRocket />
          <FilterBySuccess />

          <button
            type="button"
            className="additional-filters__button-hide"
            onClick={() => toggleAdditionalFilters(!displayAdditionFilters)}
          >
            Less filters
          </button>
        </fieldset>
      )}
    </div>
  );
}

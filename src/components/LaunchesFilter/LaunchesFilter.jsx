import React from 'react';
import { LaunchesVisibilityFilter } from '../../redux/actions';
import VisibilityFilterButton from './VisibilityFilterButton';

export default function () {
  return (
    <div>
      <div className="button-group">
        <VisibilityFilterButton filter={LaunchesVisibilityFilter.PAST}>
          Past launches
        </VisibilityFilterButton>
        <VisibilityFilterButton filter={LaunchesVisibilityFilter.ALL}>
          All launches
        </VisibilityFilterButton>
        <VisibilityFilterButton filter={LaunchesVisibilityFilter.FUTURE}>
          Future launches
        </VisibilityFilterButton>
      </div>
    </div>
  );
}

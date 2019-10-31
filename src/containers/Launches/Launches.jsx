import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchesIfNeeded, LaunchesVisibilityFilter } from '../../redux/actions';
import LaunchData from '../../components/LaunchData/LaunchData';
import LaunchesFilter from '../../components/LaunchesFilter/LaunchesFilter';
import NoLaunchesFound from './NoLaunchesFound';

const getVisibleLaunches = (launches, filter) => {
  const now = new Date();

  switch (filter) {
    case LaunchesVisibilityFilter.PAST:
      return launches.filter((launch) => launch.launch_year <= now.getFullYear()
        && new Date(launch.launch_date_utc) < now);
    case LaunchesVisibilityFilter.FUTURE:
      return launches.filter((launch) => launch.launch_year >= now.getFullYear()
        && new Date(launch.launch_date_utc) > now);
    default:
      return launches;
  }
};

export function Launches({ launches }) {
  return (
    <div>
      <LaunchesFilter />

      {launches.length === 0 && <NoLaunchesFound />}
      {launches.map((launch) => (
        <LaunchData key={`${launch.launch_date_unix}-${launch.flight_number}`} {...launch} />
      ))}
    </div>
  );
}
Launches.propTypes = {
  launches: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.launches.state,
  // launches: state.launches.launches,
  launches: getVisibleLaunches(state.launches.launches, state.launches.visibilityFilter),
});

export default withLoader(Launches, mapStateToProps, { fetchMethod: fetchLaunchesIfNeeded });

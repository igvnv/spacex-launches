import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchesIfNeeded } from '../../redux/actions';
import { filterLaunches } from '../../redux/reducers/launches';
import LaunchesFilter from '../../components/LaunchesFilter';
import NoLaunchesFound from '../../components/NoLaunchesFound/NoLaunchesFound';
import LaunchesTimetable from '../../components/LaunchesTimetable';

export function Launches({ launches }) {
  return (
    <div>
      <LaunchesFilter />

      {launches.length === 0 && <NoLaunchesFound />}
      {launches.length > 0 && <LaunchesTimetable launches={launches} />}
    </div>
  );
}
Launches.propTypes = {
  launches: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  loadingState: state.launches.state,
  launches: filterLaunches(state.launches),
});

export default withLoader(Launches, mapStateToProps, { fetchMethod: fetchLaunchesIfNeeded });

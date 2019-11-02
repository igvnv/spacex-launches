import React from 'react';
import PropTypes from 'prop-types';

import withLoader from '../../hoc/withLoader';
import { fetchLaunchesIfNeeded } from '../../redux/actions';
import { filterLaunches } from '../../redux/reducers/launches';
import LaunchData from '../../components/LaunchData/LaunchData';
import LaunchesFilter from '../../components/LaunchesFilter/LaunchesFilter';
import NoLaunchesFound from './NoLaunchesFound';

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
  launches: filterLaunches(state.launches),
});

export default withLoader(Launches, mapStateToProps, { fetchMethod: fetchLaunchesIfNeeded });

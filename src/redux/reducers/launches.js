import {
  SET_LAUNCHES_FETCH_STATE,
  SET_LAUNCHES_TIMELINE,
  SET_LAUNCHES_FILTER_BY_YEAR,
  SET_LAUNCHES_FILTER_BY_ROCKET_ID,
  SET_LAUNCHES_FILTER_BY_SUCCESS,
  RECEIVE_LAUNCHES_DATA,
  LaunchesTimeline,
} from '../actions';

const initialState = {
  state: null,
  timeline: LaunchesTimeline.ALL,
  launches: [],
  filterByYear: null,
  filterByRocketId: null,
  filterBySuccess: null,
};

export function launchesByCurrentTimeline(state) {
  const { timeline } = state;
  const now = new Date();

  switch (timeline) {
    case LaunchesTimeline.PAST:
      return state.launches.filter(
        (launch) =>
          launch.launch_year <= now.getFullYear() &&
          new Date(launch.launch_date_utc) < now
      );
    case LaunchesTimeline.FUTURE:
      return state.launches.filter(
        (launch) =>
          launch.launch_year >= now.getFullYear() &&
          new Date(launch.launch_date_utc) > now
      );
    default:
      return state.launches;
  }
}

export function filterLaunches(state) {
  const { filterByYear, filterByRocketId, filterBySuccess } = state;

  return launchesByCurrentTimeline(state)
    .filter(
      (launch) => filterByYear === null || launch.launch_year === filterByYear
    )
    .filter(
      (launch) =>
        filterByRocketId === null ||
        launch.rocket.rocket_id === filterByRocketId
    )
    .filter(
      (launch) =>
        filterBySuccess === null || launch.launch_success === filterBySuccess
    );
}

function launches(state = initialState, action) {
  switch (action.type) {
    case SET_LAUNCHES_FETCH_STATE:
      return { ...state, ...{ state: action.state } };

    case RECEIVE_LAUNCHES_DATA:
      return { ...state, ...{ launches: action.launches } };

    case SET_LAUNCHES_TIMELINE:
      return { ...state, ...{ timeline: action.timeline } };

    case SET_LAUNCHES_FILTER_BY_YEAR:
      return { ...state, ...{ filterByYear: action.year } };

    case SET_LAUNCHES_FILTER_BY_ROCKET_ID:
      return { ...state, ...{ filterByRocketId: action.rocketId } };

    case SET_LAUNCHES_FILTER_BY_SUCCESS:
      return { ...state, ...{ filterBySuccess: action.success } };

    default:
      return state;
  }
}

export default launches;

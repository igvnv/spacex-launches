/* eslint import/no-cycle: 0 */
import { LoadingStates } from '../actions';

export const LaunchesTimeline = {
  ALL: 'ALL',
  PAST: 'PAST',
  FUTURE: 'FUTURE',
};

export const SET_LAUNCHES_FETCH_STATE = 'SET_LAUNCHES_FETCH_STATE';
export function setLaunchesFetchState(loadingState) {
  return {
    type: SET_LAUNCHES_FETCH_STATE,
    state: loadingState,
  };
}

export const RECEIVE_LAUNCHES_DATA = 'RECEIVE_LAUNCHES_DATA';
export function receiveLaunchesData(data) {
  return {
    type: RECEIVE_LAUNCHES_DATA,
    launches: data,
  };
}

export const SET_LAUNCHES_TIMELINE = 'SET_LAUNCHES_TIMELINE';
export function setLaunchesTimeline(timeline) {
  return {
    type: SET_LAUNCHES_TIMELINE,
    timeline,
  };
}

export const SET_LAUNCHES_FILTER_BY_YEAR = 'SET_LAUNCHES_FILTER_BY_YEAR';
export function setLaunchesFilterByYear(year) {
  return {
    type: SET_LAUNCHES_FILTER_BY_YEAR,
    year,
  };
}

export const SET_LAUNCHES_FILTER_BY_ROCKET_ID = 'SET_LAUNCHES_FILTER_BY_ROCKET_ID';
export function setLaunchesFilterByRocketId(rocketId) {
  return {
    type: SET_LAUNCHES_FILTER_BY_ROCKET_ID,
    rocketId,
  };
}

export const SET_LAUNCHES_FILTER_BY_SUCCESS = 'SET_LAUNCHES_FILTER_BY_SUCCESS';
export function setLaunchesFilterBySuccess(success) {
  return {
    type: SET_LAUNCHES_FILTER_BY_SUCCESS,
    success,
  };
}

export function fetchLaunches() {
  return (dispatch) => {
    dispatch(setLaunchesFetchState(LoadingStates.LOADING));

    return fetch('https://api.spacexdata.com/v3/launches')
      .then(
        (response) => {
          if (response.status !== 200) {
            console.error(response);
            dispatch(setLaunchesFetchState(LoadingStates.ERROR));
            return null;
          }
          return response.json();
        },
        (error) => {
          console.error(error);
          dispatch(setLaunchesFetchState(LoadingStates.ERROR));
        },
      )
      .then((json) => {
        if (json) {
          dispatch(receiveLaunchesData(json));
          dispatch(setLaunchesFetchState(LoadingStates.DONE));
        }
      });
  };
}

export function fetchLaunchesIfNeeded() {
  return (dispatch, getState) => {
    const { state } = getState().launches;
    if (state === null || state === LoadingStates.ERROR) {
      return dispatch(fetchLaunches());
    }
    return null;
  };
}

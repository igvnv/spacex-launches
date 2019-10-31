/* eslint import/no-cycle: 0 */
import { LoadingStates } from '../actions';

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

export const SET_LAUNCHES_VISIBILITY_FILTER = 'SET_LAUNCHES_VISIBILITY_FILTER';
export function setLaunchesVisibilityFilter(visibilityFilter) {
  return {
    type: SET_LAUNCHES_VISIBILITY_FILTER,
    visibilityFilter,
  };
}

export function fetchLaunches() {
  return (dispatch) => {
    dispatch(setLaunchesFetchState(LoadingStates.LOADING));

    // return fetch('https://api.spacexdata.com/v3/launches')
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
          dispatch(setLaunchesFetchState(LoadingStates.DONE));
          dispatch(receiveLaunchesData(json));
        }
      });
  };
}

export function fetchLaunchesIfNeeded() {
  return (dispatch, getState) => {
    if (!getState().launches.state) {
      return dispatch(fetchLaunches());
    }
    return null;
  };
}

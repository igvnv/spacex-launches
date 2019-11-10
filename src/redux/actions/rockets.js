/* eslint import/no-cycle: 0 */
import { LoadingStates } from '../actions';

export const SET_ROCKETS_FETCH_STATE = 'SET_ROCKETS_FETCH_STATE';
export const setRocketsFetchState = (loadingState) => ({
  type: SET_ROCKETS_FETCH_STATE,
  state: loadingState,
});

export const RECEIVE_ROCKETS_DATA = 'RECEIVE_ROCKETS_DATA';
export const receiveRocketsData = (data) => ({
  type: RECEIVE_ROCKETS_DATA,
  data,
});

export const fetchRockets = () => (dispatch) => {
  dispatch(setRocketsFetchState(LoadingStates.LOADING));

  return fetch('https://api.spacexdata.com/v3/rockets')
    .then(
      (response) => {
        if (response.status !== 200) {
          console.error(response);
          dispatch(setRocketsFetchState(LoadingStates.ERROR));
          return null;
        }
        return response.json();
      },
      (error) => {
        console.error(error);
        dispatch(setRocketsFetchState(LoadingStates.ERROR));
      },
    )
    .then((json) => {
      if (json) {
        dispatch(receiveRocketsData(json));
        dispatch(setRocketsFetchState(LoadingStates.DONE));
      }
    });
};

export const fetchRocketsIfNeeded = () => (dispatch, getState) => {
  if (!getState().rockets.state) {
    return dispatch(fetchRockets());
  }
  return null;
};

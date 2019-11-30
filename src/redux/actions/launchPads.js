/* eslint import/no-cycle: 0 */
import { LoadingStates } from '../actions';

export const SET_LAUNCH_PADS_FETCH_STATE = 'SET_LAUNCH_PADS_FETCH_STATE';
export const setLaunchPadsFetchState = (loadingState) => ({
  type: SET_LAUNCH_PADS_FETCH_STATE,
  state: loadingState,
});

export const RECEIVE_LAUNCH_PADS_DATA = 'RECEIVE_LAUNCH_PADS_DATA';
export const receiveLaunchPadsData = (data) => ({
  type: RECEIVE_LAUNCH_PADS_DATA,
  data,
});

export const fetchLaunchPads = () => (dispatch) => {
  dispatch(setLaunchPadsFetchState(LoadingStates.LOADING));

  return fetch('https://api.spacexdata.com/v3/launchpads')
    .then(
      (response) => {
        if (response.status !== 200) {
          console.error(response);
          dispatch(setLaunchPadsFetchState(LoadingStates.ERROR));
          return null;
        }
        return response.json();
      },
      (error) => {
        console.error(error);
        dispatch(setLaunchPadsFetchState(LoadingStates.ERROR));
      },
    )
    .then((json) => {
      if (json) {
        dispatch(receiveLaunchPadsData(json));
        dispatch(setLaunchPadsFetchState(LoadingStates.DONE));
      }
    });
};

export const fetchLaunchPadsIfNeeded = () => (dispatch, getState) => {
  const { state } = getState().launchPads;
  if (state === null || state === LoadingStates.ERROR) {
    return dispatch(fetchLaunchPads());
  }
  return null;
};

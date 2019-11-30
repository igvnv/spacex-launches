/* eslint import/no-cycle: 0 */
import { LoadingStates } from '../actions';

export const SET_LANDING_PADS_FETCH_STATE = 'SET_LANDING_PADS_FETCH_STATE';
export const setLandingPadsFetchState = (loadingState) => ({
  type: SET_LANDING_PADS_FETCH_STATE,
  state: loadingState,
});

export const RECEIVE_LANDING_PADS_DATA = 'RECEIVE_LANDING_PADS_DATA';
export const receiveLandingPadsData = (data) => ({
  type: RECEIVE_LANDING_PADS_DATA,
  data,
});

export const fetchLandingPads = () => (dispatch) => {
  dispatch(setLandingPadsFetchState(LoadingStates.LOADING));

  return fetch('https://api.spacexdata.com/v3/landpads')
    .then(
      (response) => {
        if (response.status !== 200) {
          console.error(response);
          dispatch(setLandingPadsFetchState(LoadingStates.ERROR));
          return null;
        }
        return response.json();
      },
      (error) => {
        console.error(error);
        dispatch(setLandingPadsFetchState(LoadingStates.ERROR));
      },
    )
    .then((json) => {
      if (json) {
        dispatch(receiveLandingPadsData(json));
        dispatch(setLandingPadsFetchState(LoadingStates.DONE));
      }
    });
};

export const fetchLandingPadsIfNeeded = () => (dispatch, getState) => {
  const { state } = getState().landingPads;
  if (state === null || state === LoadingStates.ERROR) {
    return dispatch(fetchLandingPads());
  }
  return null;
};

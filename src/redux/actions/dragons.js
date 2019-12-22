/* eslint import/no-cycle: 0 */
import { LoadingStates } from '../actions';

export const SET_DRAGONS_FETCH_STATE = 'SET_DRAGONS_FETCH_STATE';
export const setDragonsFetchState = (loadingState) => ({
  type: SET_DRAGONS_FETCH_STATE,
  state: loadingState,
});

export const RECEIVE_DRAGONS_DATA = 'RECEIVE_DRAGONS_DATA';
export const receiveDragonsData = (data) => ({
  type: RECEIVE_DRAGONS_DATA,
  data,
});

export const fetchDragons = () => (dispatch) => {
  dispatch(setDragonsFetchState(LoadingStates.LOADING));

  return fetch('https://api.spacexdata.com/v3/dragons')
    .then(
      (response) => {
        if (response.status !== 200) {
          console.error(response);
          dispatch(setDragonsFetchState(LoadingStates.ERROR));
          return null;
        }
        return response.json();
      },
      (error) => {
        console.error(error);
        dispatch(setDragonsFetchState(LoadingStates.ERROR));
      }
    )
    .then((json) => {
      if (json) {
        dispatch(receiveDragonsData(json));
        dispatch(setDragonsFetchState(LoadingStates.DONE));
      }
    });
};

export const fetchDragonsIfNeeded = () => (dispatch, getState) => {
  const { state } = getState().dragons;
  if (state === null || state === LoadingStates.ERROR) {
    return dispatch(fetchDragons());
  }
  return null;
};

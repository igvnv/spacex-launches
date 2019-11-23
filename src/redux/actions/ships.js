/* eslint import/no-cycle: 0 */
import { LoadingStates } from '../actions';

export const SET_SHIPS_FETCH_STATE = 'SET_SHIPS_FETCH_STATE';
export const setShipsFetchState = (loadingState) => ({
  type: SET_SHIPS_FETCH_STATE,
  state: loadingState,
});

export const RECEIVE_SHIPS_DATA = 'RECEIVE_SHIPS_DATA';
export const receiveShipsData = (data) => ({
  type: RECEIVE_SHIPS_DATA,
  data,
});

export const fetchShips = () => (dispatch) => {
  dispatch(setShipsFetchState(LoadingStates.LOADING));

  return fetch('https://api.spacexdata.com/v3/ships')
    .then(
      (response) => {
        if (response.status !== 200) {
          console.error(response);
          dispatch(setShipsFetchState(LoadingStates.ERROR));
          return null;
        }
        return response.json();
      },
      (error) => {
        console.error(error);
        dispatch(setShipsFetchState(LoadingStates.ERROR));
      },
    )
    .then((json) => {
      if (json) {
        dispatch(receiveShipsData(json));
        dispatch(setShipsFetchState(LoadingStates.DONE));
      }
    });
};

export const fetchShipsIfNeeded = () => (dispatch, getState) => {
  if (!getState().ships.state) {
    return dispatch(fetchShips());
  }
  return null;
};

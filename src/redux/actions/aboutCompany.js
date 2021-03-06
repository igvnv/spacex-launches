/* eslint import/no-cycle: 0 */
import 'cross-fetch/polyfill';
import { LoadingStates } from '../actions';

export const SET_ABOUT_COMPANY_FETCH_STATE = 'SET_ABOUT_COMPANY_FETCH_STATE';
export function setAboutCompanyFetchState(loadingState) {
  return {
    type: SET_ABOUT_COMPANY_FETCH_STATE,
    state: loadingState,
  };
}

export const RECEIVE_ABOUT_COMPANY_DATA = 'RECEIVE_ABOUT_COMPANY_DATA';
export function receiveAboutCompanyData(data) {
  return {
    type: RECEIVE_ABOUT_COMPANY_DATA,
    data,
  };
}

export function fetchAboutCompanyData() {
  return (dispatch) => {
    dispatch(setAboutCompanyFetchState(LoadingStates.LOADING));

    return fetch('https://api.spacexdata.com/v3/info')
      .then(
        (response) => {
          if (response.status !== 200) {
            console.error(response);
            dispatch(setAboutCompanyFetchState(LoadingStates.ERROR));
            return null;
          }
          return response.json();
        },
        (error) => {
          console.error(error);
          dispatch(setAboutCompanyFetchState(LoadingStates.ERROR));
        }
      )
      .then((json) => {
        if (json) {
          dispatch(receiveAboutCompanyData(json));
          dispatch(setAboutCompanyFetchState(LoadingStates.DONE));
        }
      });
  };
}

export function fetchAboutCompanyDataIfNeeded() {
  return (dispatch, getState) => {
    const { state } = getState().aboutCompany;
    if (state === null || state === LoadingStates.ERROR) {
      return dispatch(fetchAboutCompanyData());
    }
    return null;
  };
}

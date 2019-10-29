import 'cross-fetch/polyfill';
import { LoadingStates } from './index';

export const SET_ABOUT_COMPANY_FETCH_STATE = 'SET_ABOUT_COMPANY_FETCH_STATE';
export function setAboutCompanyFetchState(loadingState) {
  return {
    type: SET_ABOUT_COMPANY_FETCH_STATE,
    state: loadingState
  }
}

export const RECEIVE_ABOUT_COMPANY_DATA = 'RECEIVE_ABOUT_COMPANY_DATA';
export function receiveAboutCompanyData(data) {
  return {
    type: RECEIVE_ABOUT_COMPANY_DATA,
    data
  }
}

export function fetchAboutCompanyData() {
  return dispatch => {
    dispatch(setAboutCompanyFetchState(LoadingStates.LOADING));

    return fetch('https://api.spacexdata.com/v3/info')
      .then(
        response => {
          if (response.status !== 200) {
            console.error(response);
            dispatch(setAboutCompanyFetchState(LoadingStates.ERROR));
            return null;
          }
          return response.json();
        },
        error => {
          console.error(error);
          dispatch(setAboutCompanyFetchState(LoadingStates.ERROR));
        }
      )
      .then(json => {
        if (json) {
          dispatch(setAboutCompanyFetchState(LoadingStates.DONE));
          dispatch(receiveAboutCompanyData(json));
        }
      });
  }
}

export function fetchAboutCompanyDataIfNeeded() {
  return (dispatch, getState) => {
    if (!getState().aboutCompany.state) {
      return dispatch(fetchAboutCompanyData());
    }
  }
}
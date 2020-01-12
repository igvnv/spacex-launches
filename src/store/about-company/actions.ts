import 'cross-fetch/polyfill';

import { ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import AboutCompany from '../../models/about-company';
import LoadingStates, {
  LOADING_ERROR,
  LOADING_IN_PROCESS,
  LOADING_IS_DONE,
} from '../types';
import { AppState, AppThunk } from '../reducers';
import {
  AboutCompanyActionTypes,
  SET_ABOUT_COMPANY_FETCH_STATE,
  RECEIVE_ABOUT_COMPANY_DATA,
} from './types';

export const setAboutCompanyFetchState = (
  state: LoadingStates
): AboutCompanyActionTypes => {
  return {
    type: SET_ABOUT_COMPANY_FETCH_STATE,
    state,
  };
};

export function receiveAboutCompanyData(
  data: AboutCompany
): AboutCompanyActionTypes {
  return {
    type: RECEIVE_ABOUT_COMPANY_DATA,
    data,
  };
}

export const fetchAboutCompanyData: ActionCreator<AppThunk> = () => {
  return async (
    dispatch: ThunkDispatch<AppState, null, AboutCompanyActionTypes>
  ) => {
    dispatch(setAboutCompanyFetchState(LOADING_IN_PROCESS));

    try {
      const response = await fetch('https://api.spacexdata.com/v3/info');
      if (response.status !== 200) {
        throw new Error();
      }

      const data = await response.json();

      dispatch(receiveAboutCompanyData(data));
      dispatch(setAboutCompanyFetchState(LOADING_IS_DONE));
    } catch (e) {
      console.error(e);
      dispatch(setAboutCompanyFetchState(LOADING_ERROR));
    }
  };
};

export const fetchAboutCompanyDataIfNeeded: ActionCreator<AppThunk> = () => {
  return (
    dispatch: ThunkDispatch<AppState, null, AboutCompanyActionTypes>,
    getState: () => AppState
  ) => {
    const { state: loadingState } = getState().aboutCompany;

    if (loadingState === null || loadingState === LOADING_ERROR) {
      return dispatch(fetchAboutCompanyData());
    }
  };
};

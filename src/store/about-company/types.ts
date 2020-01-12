import AboutCompany from '../../models/about-company';
import LoadingStates from '../types';

export const RECEIVE_ABOUT_COMPANY_DATA = 'RECEIVE_ABOUT_COMPANY_DATA';

export const SET_ABOUT_COMPANY_FETCH_STATE = 'SET_ABOUT_COMPANY_FETCH_STATE';

interface SetFetchStateAction {
  type: typeof SET_ABOUT_COMPANY_FETCH_STATE;
  state: LoadingStates;
}
interface ReceiveDataAction {
  type: typeof RECEIVE_ABOUT_COMPANY_DATA;
  data: AboutCompany;
}

export type AboutCompanyActionTypes = SetFetchStateAction | ReceiveDataAction;

export type AboutCompanyState = {
  readonly state: LoadingStates | null;
  readonly data: AboutCompany | null;
};

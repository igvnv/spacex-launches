import { AboutCompanyActionTypes, AboutCompanyState } from './types';

const initialState: AboutCompanyState = {
  state: null,
  data: null,
};

const aboutCompany = (
  state = initialState,
  action: AboutCompanyActionTypes
): AboutCompanyState => {
  switch (action.type) {
    case 'SET_ABOUT_COMPANY_FETCH_STATE':
      return { ...state, ...{ state: action.state } };

    case 'RECEIVE_ABOUT_COMPANY_DATA':
      return { ...state, ...{ data: action.data } };

    default:
      return state;
  }
};

export default aboutCompany;

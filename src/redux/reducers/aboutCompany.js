import {
  SET_ABOUT_COMPANY_FETCH_STATE,
  RECEIVE_ABOUT_COMPANY_DATA,
} from '../actions';

const initialState = {
  state: null,
  data: null,
};

function aboutCompany(state = initialState, action) {
  switch (action.type) {
    case SET_ABOUT_COMPANY_FETCH_STATE:
      return { ...state, ...{ state: action.state } };

    case RECEIVE_ABOUT_COMPANY_DATA:
      return { ...state, ...{ data: action.data } };

    default:
      return state;
  }
}

export default aboutCompany;

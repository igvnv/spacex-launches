import { combineReducers } from 'redux';

import aboutCompany from './reducers/aboutCompany';
import dragons from './reducers/dragons';
import launches from './reducers/launches';
import rockets from './reducers/rockets';

export default combineReducers({
  aboutCompany,
  dragons,
  launches,
  rockets,
});

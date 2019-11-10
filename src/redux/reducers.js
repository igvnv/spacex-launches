import { combineReducers } from 'redux';

import aboutCompany from './reducers/aboutCompany';
import launches from './reducers/launches';
import rockets from './reducers/rockets';

export default combineReducers({ aboutCompany, launches, rockets });

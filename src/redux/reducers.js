import { combineReducers } from 'redux';

import aboutCompany from './reducers/aboutCompany';
import launches from './reducers/launches';

export default combineReducers({ aboutCompany, launches });

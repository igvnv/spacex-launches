import { combineReducers } from 'redux';

import aboutCompany from './aboutCompany';
import launches from './launches';

export default combineReducers({aboutCompany, launches});
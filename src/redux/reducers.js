import { combineReducers } from 'redux';

import aboutCompany from './reducers/aboutCompany';
import dragons from './reducers/dragons';
import landingPads from './reducers/landingPads';
import launches from './reducers/launches';
import launchPads from './reducers/launchPads';
import rockets from './reducers/rockets';
import ships from './reducers/ships';

export default combineReducers({
  aboutCompany,
  dragons,
  landingPads,
  launches,
  launchPads,
  rockets,
  ships,
});

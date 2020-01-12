import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';

import aboutCompany from './about-company/reducers';
import { AboutCompanyActionTypes } from './about-company/types';
import dragons from './reducers/dragons';
import landingPads from './reducers/landingPads';
import launches from './reducers/launches';
import launchPads from './reducers/launchPads';
import rockets from './reducers/rockets';
import ships from './reducers/ships';

export type AppActions = AboutCompanyActionTypes;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  null,
  AppActions
>;

const rootReducer = combineReducers({
  aboutCompany,
  dragons,
  landingPads,
  launches,
  launchPads,
  rockets,
  ships,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;

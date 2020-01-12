import { AboutCompanyActionTypes } from './about-company/types';

export const LoadingStates = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  DONE: 'DONE',
};

export * from './about-company/actions';
export * from './actions/dragons';
export * from './actions/landingPads';
export * from './actions/launches';
export * from './actions/launchPads';
export * from './actions/rockets';
export * from './actions/ships';

export type AppActions = AboutCompanyActionTypes;

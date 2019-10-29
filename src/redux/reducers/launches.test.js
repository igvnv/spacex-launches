import reducer from './launches';
import {
  SET_LAUNCHES_FETCH_STATE,
  SET_LAUNCHES_VISIBILITY_FILTER,
  RECEIVE_LAUNCHES_DATA,
  LoadingStates,
  LaunchesVisibilityFilter
} from '../actions';

describe('launches reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      visibilityFilter: LaunchesVisibilityFilter.ALL,
      launches: []
    });
  });

  it('should handle SET_LAUNCHES_FETCH_STATE', () => {
    expect(reducer(
      {state: null},
      {
        type: SET_LAUNCHES_FETCH_STATE,
        state: LoadingStates.ERROR
      }))
      .toEqual({state: LoadingStates.ERROR});
  });

  it('should handle SET_LAUNCHES_VISIBILITY_FILTER', () => {
    expect(reducer(
      {visibilityFilter: null},
      {
        type: SET_LAUNCHES_VISIBILITY_FILTER,
        visibilityFilter: LaunchesVisibilityFilter.FUTURE
      }))
      .toEqual({visibilityFilter: LaunchesVisibilityFilter.FUTURE});
  });

  it('should handle RECEIVE_LAUNCHES_DATA', () => {
    const launchesList = [{'flight_number': 1}, {'flight_number': 2}];

    expect(reducer(
      {launches: null},
      {
        type: RECEIVE_LAUNCHES_DATA,
        launches: launchesList
      }))
      .toEqual({launches: launchesList});
  });
});
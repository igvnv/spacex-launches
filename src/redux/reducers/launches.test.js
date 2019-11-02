import reducer from './launches';
import {
  LaunchesTimeline,
  LoadingStates,
  RECEIVE_LAUNCHES_DATA,
  SET_LAUNCHES_FETCH_STATE,
  SET_LAUNCHES_FILTER_BY_ROCKET_ID,
  SET_LAUNCHES_FILTER_BY_SUCCESS,
  SET_LAUNCHES_FILTER_BY_YEAR,
  SET_LAUNCHES_TIMELINE,
} from '../actions';

describe('launches reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      timeline: LaunchesTimeline.ALL,
      launches: [],
      filterByYear: null,
      filterByRocketId: null,
      filterBySuccess: null,
    });
  });

  it('should handle SET_LAUNCHES_FETCH_STATE', () => {
    expect(reducer(
      { state: null },
      {
        type: SET_LAUNCHES_FETCH_STATE,
        state: LoadingStates.ERROR,
      },
    )).toEqual({ state: LoadingStates.ERROR });
  });

  it('should handle SET_LAUNCHES_TIMELINE', () => {
    expect(reducer(
      { timeline: null },
      {
        type: SET_LAUNCHES_TIMELINE,
        timeline: LaunchesTimeline.FUTURE,
      },
    )).toEqual({ timeline: LaunchesTimeline.FUTURE });
  });

  it('should handle SET_LAUNCHES_FILTER_BY_YEAR', () => {
    expect(reducer(
      { filterByYear: null },
      {
        type: SET_LAUNCHES_FILTER_BY_YEAR,
        year: 2020,
      },
    )).toEqual({ filterByYear: 2020 });
  });

  it('should handle SET_LAUNCHES_FILTER_BY_ROCKET_ID', () => {
    expect(reducer(
      { filterByRocketId: null },
      {
        type: SET_LAUNCHES_FILTER_BY_ROCKET_ID,
        rocketId: 'falcon1',
      },
    )).toEqual({ filterByRocketId: 'falcon1' });
  });

  it('should handle SET_LAUNCHES_FILTER_BY_SUCCESS', () => {
    expect(reducer(
      { filterBySuccess: null },
      {
        type: SET_LAUNCHES_FILTER_BY_SUCCESS,
        success: true,
      },
    )).toEqual({ filterBySuccess: true });
  });

  it('should handle RECEIVE_LAUNCHES_DATA', () => {
    const launchesList = [{ flight_number: 1 }, { flight_number: 2 }];

    expect(reducer(
      { launches: null },
      {
        type: RECEIVE_LAUNCHES_DATA,
        launches: launchesList,
      },
    )).toEqual({ launches: launchesList });
  });
});

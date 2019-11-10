import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';

const mockStore = configureMockStore([thunk]);

describe('Launches Actions test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setLaunchesFetchState action', () => {
    const expectedAction = {
      type: actions.SET_LAUNCHES_FETCH_STATE,
      state: actions.LoadingStates.LOADING,
    };

    expect(actions.setLaunchesFetchState(actions.LoadingStates.LOADING))
      .toEqual(expectedAction);
  });

  test('receiveLaunchesData action', () => {
    const data = { test: 'data' };
    const expectedAction = {
      type: actions.RECEIVE_LAUNCHES_DATA,
      launches: data,
    };

    expect(actions.receiveLaunchesData(data))
      .toEqual(expectedAction);
  });

  test('setLaunchesTimeline action', () => {
    const expectedAction = {
      type: actions.SET_LAUNCHES_TIMELINE,
      timeline: actions.LaunchesTimeline.FUTURE,
    };

    expect(actions.setLaunchesTimeline(actions.LaunchesTimeline.FUTURE))
      .toEqual(expectedAction);
  });

  test('setLaunchesFilterByYear action', () => {
    const expectedAction = {
      type: actions.SET_LAUNCHES_FILTER_BY_YEAR,
      year: 2020,
    };

    expect(actions.setLaunchesFilterByYear(2020))
      .toEqual(expectedAction);
  });

  test('setLaunchesFilterByRocketId action', () => {
    const expectedAction = {
      type: actions.SET_LAUNCHES_FILTER_BY_ROCKET_ID,
      rocketId: 'falcon1',
    };

    expect(actions.setLaunchesFilterByRocketId('falcon1'))
      .toEqual(expectedAction);
  });

  test('setLaunchesFilterBySuccess action', () => {
    const expectedAction = {
      type: actions.SET_LAUNCHES_FILTER_BY_SUCCESS,
      success: true,
    };

    expect(actions.setLaunchesFilterBySuccess(true))
      .toEqual(expectedAction);
  });

  test('fetchLaunches action', async () => {
    const launchesList = [{ flight_number: 1 }, { flight_number: 2 }];

    fetchMock.getOnce('https://api.spacexdata.com/v3/launches', {
      body: launchesList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_LAUNCHES_DATA, launches: launchesList },
      { type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ launches: { data: {}, state: null } });

    await store.dispatch(actions.fetchLaunches());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLaunches action with error in response', () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/launches', 500);

    const expectedActions = [
      { type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.ERROR },
    ];

    const store = mockStore({ launches: { data: {}, state: null } });

    return store.dispatch(actions.fetchLaunches()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('fetchLaunches action fetches data when it wasn\'t fetched', async () => {
    const launchesList = [{ flight_number: 1 }, { flight_number: 2 }];

    fetchMock.getOnce('https://api.spacexdata.com/v3/launches', {
      body: launchesList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_LAUNCHES_DATA, launches: launchesList },
      { type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ launches: { data: {}, state: null } });

    await store.dispatch(actions.fetchLaunchesIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLaunches does not fetch data again after successful fetch', async () => {
    const store = mockStore({ launches: { data: {}, state: actions.LoadingStates.DONE } });

    await store.dispatch(actions.fetchLaunchesIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });
});

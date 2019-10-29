import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from "./index";

const mockStore = configureMockStore([thunk]);

describe('Launches Actions test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setLaunchesFetchState action', () => {
    const expectedAction = {
      type: actions.SET_LAUNCHES_FETCH_STATE,
      state: actions.LoadingStates.LOADING
    };

    expect(actions.setLaunchesFetchState(actions.LoadingStates.LOADING))
      .toEqual(expectedAction);
  });

  test('receiveLaunchesData action', () => {
    const
      data = {test: 'data'},
      expectedAction = {
        type: actions.RECEIVE_LAUNCHES_DATA,
        data: data
      };

    expect(actions.receiveLaunchesData(data))
      .toEqual(expectedAction);
  });

  test('setLaunchesVisibilityFilter action', () => {
    const expectedAction = {
      type: actions.SET_LAUNCHES_VISIBILITY_FILTER,
      visibilityFilter: actions.LaunchesVisibilityFilter.FUTURE
    };

    expect(actions.setLaunchesVisibilityFilter(actions.LaunchesVisibilityFilter.FUTURE))
      .toEqual(expectedAction);
  });

  test('fetchLaunches action', async () => {
    const launchesList = [{'flight_number': 1}, {'flight_number': 2}];

    fetchMock.getOnce('https://api.spacexdata.com/v3/launches', {
      body: launchesList,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      {type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.LOADING},
      {type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.DONE},
      {type: actions.RECEIVE_LAUNCHES_DATA, data: launchesList}
    ];

    const store = mockStore({launches: {data: {}, state: null}});

    await store.dispatch(actions.fetchLaunches());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLaunches action with error in response', () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/launches', 500);

    const expectedActions = [
      {type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.LOADING},
      {type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.ERROR},
    ];

    const store = mockStore({launches: {data: {}, state: null}});

    return store.dispatch(actions.fetchLaunches()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('fetchLaunches action fetches data when it wasn\'t fetched', async () => {
    const launchesList = [{'flight_number': 1}, {'flight_number': 2}];

    fetchMock.getOnce('https://api.spacexdata.com/v3/launches', {
      body: launchesList,
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      {type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.LOADING},
      {type: actions.SET_LAUNCHES_FETCH_STATE, state: actions.LoadingStates.DONE},
      {type: actions.RECEIVE_LAUNCHES_DATA, data: launchesList}
    ];

    const store = mockStore({launches: {data: {}, state: null}});

    await store.dispatch(actions.fetchLaunchesIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLaunches does not fetch data again after successful fetch', async () => {
    const store = mockStore({launches: {data: {}, state: actions.LoadingStates.DONE}});

    await store.dispatch(actions.fetchLaunchesIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });
});
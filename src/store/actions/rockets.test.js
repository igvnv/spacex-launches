import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';
import rocketsList from '../../../__tests__/data/rockets';

const mockStore = configureMockStore([thunk]);

describe('Rockets Actions test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setRocketsFetchState action', () => {
    const expectedAction = {
      type: actions.SET_ROCKETS_FETCH_STATE,
      state: actions.LoadingStates.LOADING,
    };

    expect(actions.setRocketsFetchState(actions.LoadingStates.LOADING)).toEqual(
      expectedAction
    );
  });

  test('receiveRocketsData action', () => {
    const data = { test: 'data' };
    const expectedAction = {
      type: actions.RECEIVE_ROCKETS_DATA,
      data,
    };

    expect(actions.receiveRocketsData(data)).toEqual(expectedAction);
  });

  test('fetchRockets action', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/rockets', {
      body: rocketsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.SET_ROCKETS_FETCH_STATE,
        state: actions.LoadingStates.LOADING,
      },
      { type: actions.RECEIVE_ROCKETS_DATA, data: rocketsList },
      {
        type: actions.SET_ROCKETS_FETCH_STATE,
        state: actions.LoadingStates.DONE,
      },
    ];

    const store = mockStore({ rockets: { data: {}, state: null } });

    await store.dispatch(actions.fetchRockets());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchRockets action with error in response', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/rockets', 500);

    const expectedActions = [
      {
        type: actions.SET_ROCKETS_FETCH_STATE,
        state: actions.LoadingStates.LOADING,
      },
      {
        type: actions.SET_ROCKETS_FETCH_STATE,
        state: actions.LoadingStates.ERROR,
      },
    ];

    const store = mockStore({ rockets: { data: {}, state: null } });

    await store.dispatch(actions.fetchRockets());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("fetchRockets action fetches data when it wasn't fetched", async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/rockets', {
      body: rocketsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.SET_ROCKETS_FETCH_STATE,
        state: actions.LoadingStates.LOADING,
      },
      { type: actions.RECEIVE_ROCKETS_DATA, data: rocketsList },
      {
        type: actions.SET_ROCKETS_FETCH_STATE,
        state: actions.LoadingStates.DONE,
      },
    ];

    const store = mockStore({ rockets: { data: {}, state: null } });

    await store.dispatch(actions.fetchRocketsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchRockets does not fetch data again after successful fetch', async () => {
    const store = mockStore({
      rockets: { data: {}, state: actions.LoadingStates.DONE },
    });

    await store.dispatch(actions.fetchRocketsIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });

  test('fetchRockets action fetches data after error', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/rockets', {
      body: rocketsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.SET_ROCKETS_FETCH_STATE,
        state: actions.LoadingStates.LOADING,
      },
      { type: actions.RECEIVE_ROCKETS_DATA, data: rocketsList },
      {
        type: actions.SET_ROCKETS_FETCH_STATE,
        state: actions.LoadingStates.DONE,
      },
    ];

    const store = mockStore({
      rockets: { data: {}, state: actions.LoadingStates.ERROR },
    });

    await store.dispatch(actions.fetchRocketsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

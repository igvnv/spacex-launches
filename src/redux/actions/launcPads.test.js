import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';
import launchPadsList from '../../../__tests__/data/launchpads';

const mockStore = configureMockStore([thunk]);

describe('Launch Pads Actions test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setLaunchPadsFetchState action', () => {
    const expectedAction = {
      type: actions.SET_LAUNCH_PADS_FETCH_STATE,
      state: actions.LoadingStates.LOADING,
    };

    expect(actions.setLaunchPadsFetchState(actions.LoadingStates.LOADING))
      .toEqual(expectedAction);
  });

  test('receiveLaunchPadsData action', () => {
    const data = { test: 'data' };
    const expectedAction = {
      type: actions.RECEIVE_LAUNCH_PADS_DATA,
      data,
    };

    expect(actions.receiveLaunchPadsData(data))
      .toEqual(expectedAction);
  });

  test('fetchLaunchPads action', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/launchpads', {
      body: launchPadsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_LAUNCH_PADS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_LAUNCH_PADS_DATA, data: launchPadsList },
      { type: actions.SET_LAUNCH_PADS_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ launchPads: { data: [], state: null } });

    await store.dispatch(actions.fetchLaunchPads());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLaunchPads action with error in response', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/launchpads', 500);

    const expectedActions = [
      { type: actions.SET_LAUNCH_PADS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.SET_LAUNCH_PADS_FETCH_STATE, state: actions.LoadingStates.ERROR },
    ];

    const store = mockStore({ launchPads: { data: [], state: null } });

    await store.dispatch(actions.fetchLaunchPads());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLaunchPads action fetches data when it wasn\'t fetched', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/launchpads', {
      body: launchPadsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_LAUNCH_PADS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_LAUNCH_PADS_DATA, data: launchPadsList },
      { type: actions.SET_LAUNCH_PADS_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ launchPads: { data: [], state: null } });

    await store.dispatch(actions.fetchLaunchPadsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLaunchPads does not fetch data again after successful fetch', async () => {
    const store = mockStore({
      launchPads: { data: launchPadsList, state: actions.LoadingStates.DONE },
    });

    await store.dispatch(actions.fetchLaunchPadsIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';
import landingPadsList from '../../../__tests__/data/landingpads';

const mockStore = configureMockStore([thunk]);

describe('Landing Pads Actions test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setLandingPadsFetchState action', () => {
    const expectedAction = {
      type: actions.SET_LANDING_PADS_FETCH_STATE,
      state: actions.LoadingStates.LOADING,
    };

    expect(actions.setLandingPadsFetchState(actions.LoadingStates.LOADING))
      .toEqual(expectedAction);
  });

  test('receiveLandingPadsData action', () => {
    const data = { test: 'data' };
    const expectedAction = {
      type: actions.RECEIVE_LANDING_PADS_DATA,
      data,
    };

    expect(actions.receiveLandingPadsData(data))
      .toEqual(expectedAction);
  });

  test('fetchLandingPads action', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/landpads', {
      body: landingPadsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_LANDING_PADS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_LANDING_PADS_DATA, data: landingPadsList },
      { type: actions.SET_LANDING_PADS_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ landingPads: { data: [], state: null } });

    await store.dispatch(actions.fetchLandingPads());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLandingPads action with error in response', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/landpads', 500);

    const expectedActions = [
      { type: actions.SET_LANDING_PADS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.SET_LANDING_PADS_FETCH_STATE, state: actions.LoadingStates.ERROR },
    ];

    const store = mockStore({ landingPads: { data: [], state: null } });

    await store.dispatch(actions.fetchLandingPads());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLandingPads action fetches data when it wasn\'t fetched', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/landpads', {
      body: landingPadsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_LANDING_PADS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_LANDING_PADS_DATA, data: landingPadsList },
      { type: actions.SET_LANDING_PADS_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ landingPads: { data: [], state: null } });

    await store.dispatch(actions.fetchLandingPadsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchLandingPads does not fetch data again after successful fetch', async () => {
    const store = mockStore({
      landingPads: { data: landingPadsList, state: actions.LoadingStates.DONE },
    });

    await store.dispatch(actions.fetchLandingPadsIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });
});

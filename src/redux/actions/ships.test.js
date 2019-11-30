import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';
import shipsList from '../../../__tests__/data/ships';

const mockStore = configureMockStore([thunk]);

describe('Ships Actions test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setShipsFetchState action', () => {
    const expectedAction = {
      type: actions.SET_SHIPS_FETCH_STATE,
      state: actions.LoadingStates.LOADING,
    };

    expect(actions.setShipsFetchState(actions.LoadingStates.LOADING))
      .toEqual(expectedAction);
  });

  test('receiveShipsData action', () => {
    const data = { test: 'data' };
    const expectedAction = {
      type: actions.RECEIVE_SHIPS_DATA,
      data,
    };

    expect(actions.receiveShipsData(data))
      .toEqual(expectedAction);
  });

  test('fetchShips action', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/ships', {
      body: shipsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_SHIPS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_SHIPS_DATA, data: shipsList },
      { type: actions.SET_SHIPS_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ ships: { data: {}, state: null } });

    await store.dispatch(actions.fetchShips());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchShips action with error in response', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/ships', 500);

    const expectedActions = [
      { type: actions.SET_SHIPS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.SET_SHIPS_FETCH_STATE, state: actions.LoadingStates.ERROR },
    ];

    const store = mockStore({ ships: { data: {}, state: null } });

    await store.dispatch(actions.fetchShips());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchShips action fetches data when it wasn\'t fetched', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/ships', {
      body: shipsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_SHIPS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_SHIPS_DATA, data: shipsList },
      { type: actions.SET_SHIPS_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ ships: { data: {}, state: null } });

    await store.dispatch(actions.fetchShipsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchShips does not fetch data again after successful fetch', async () => {
    const store = mockStore({ ships: { data: shipsList, state: actions.LoadingStates.DONE } });

    await store.dispatch(actions.fetchShipsIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });

  test('fetchShips action fetches data after error', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/ships', {
      body: shipsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_SHIPS_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_SHIPS_DATA, data: shipsList },
      { type: actions.SET_SHIPS_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ ships: { data: {}, state: actions.LoadingStates.ERROR } });

    await store.dispatch(actions.fetchShipsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

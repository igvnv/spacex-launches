import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';
import dragonsList from '../../../__tests__/data/dragons';

const mockStore = configureMockStore([thunk]);

describe('Dragons Actions test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setDragonsFetchState action', () => {
    const expectedAction = {
      type: actions.SET_DRAGONS_FETCH_STATE,
      state: actions.LoadingStates.LOADING,
    };

    expect(actions.setDragonsFetchState(actions.LoadingStates.LOADING)).toEqual(
      expectedAction
    );
  });

  test('receiveDragonsData action', () => {
    const data = { test: 'data' };
    const expectedAction = {
      type: actions.RECEIVE_DRAGONS_DATA,
      data,
    };

    expect(actions.receiveDragonsData(data)).toEqual(expectedAction);
  });

  test('fetchDragons action', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/dragons', {
      body: dragonsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.SET_DRAGONS_FETCH_STATE,
        state: actions.LoadingStates.LOADING,
      },
      { type: actions.RECEIVE_DRAGONS_DATA, data: dragonsList },
      {
        type: actions.SET_DRAGONS_FETCH_STATE,
        state: actions.LoadingStates.DONE,
      },
    ];

    const store = mockStore({ dragons: { data: {}, state: null } });

    await store.dispatch(actions.fetchDragons());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchDragons action with error in response', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/dragons', 500);

    const expectedActions = [
      {
        type: actions.SET_DRAGONS_FETCH_STATE,
        state: actions.LoadingStates.LOADING,
      },
      {
        type: actions.SET_DRAGONS_FETCH_STATE,
        state: actions.LoadingStates.ERROR,
      },
    ];

    const store = mockStore({ dragons: { data: {}, state: null } });

    await store.dispatch(actions.fetchDragons());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("fetchDragons action fetches data when it wasn't fetched", async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/dragons', {
      body: dragonsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.SET_DRAGONS_FETCH_STATE,
        state: actions.LoadingStates.LOADING,
      },
      { type: actions.RECEIVE_DRAGONS_DATA, data: dragonsList },
      {
        type: actions.SET_DRAGONS_FETCH_STATE,
        state: actions.LoadingStates.DONE,
      },
    ];

    const store = mockStore({ dragons: { data: {}, state: null } });

    await store.dispatch(actions.fetchDragonsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchDragons does not fetch data again after successful fetch', async () => {
    const store = mockStore({
      dragons: { data: {}, state: actions.LoadingStates.DONE },
    });

    await store.dispatch(actions.fetchDragonsIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });

  test('fetchDragons action fetches data after error', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/dragons', {
      body: dragonsList,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: actions.SET_DRAGONS_FETCH_STATE,
        state: actions.LoadingStates.LOADING,
      },
      { type: actions.RECEIVE_DRAGONS_DATA, data: dragonsList },
      {
        type: actions.SET_DRAGONS_FETCH_STATE,
        state: actions.LoadingStates.DONE,
      },
    ];

    const store = mockStore({
      dragons: { data: {}, state: actions.LoadingStates.ERROR },
    });

    await store.dispatch(actions.fetchDragonsIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

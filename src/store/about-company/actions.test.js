import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchAboutCompanyData,
  fetchAboutCompanyDataIfNeeded,
  receiveAboutCompanyData,
  setAboutCompanyFetchState,
} from './actions.ts';
import {
  RECEIVE_ABOUT_COMPANY_DATA,
  SET_ABOUT_COMPANY_FETCH_STATE,
} from './types.ts';
import {
  LOADING_ERROR,
  LOADING_IN_PROCESS,
  LOADING_IS_DONE,
} from '../types.ts';

const mockStore = configureMockStore([thunk]);

describe('AboutCompany actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setAboutCompanyFetchState action', () => {
    const expectedAction = {
      type: SET_ABOUT_COMPANY_FETCH_STATE,
      state: LOADING_IN_PROCESS,
    };

    expect(setAboutCompanyFetchState(LOADING_IN_PROCESS)).toEqual(
      expectedAction
    );
  });

  test('receiveAboutCompanyData action', () => {
    const data = { test: 'data' };
    const expectedAction = {
      type: RECEIVE_ABOUT_COMPANY_DATA,
      data,
    };

    expect(receiveAboutCompanyData(data)).toEqual(expectedAction);
  });

  test('fetchAboutCompanyData action', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/info', {
      body: { name: 'name', founder: 'founder', founded: 2002 },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: SET_ABOUT_COMPANY_FETCH_STATE,
        state: LOADING_IN_PROCESS,
      },
      {
        type: RECEIVE_ABOUT_COMPANY_DATA,
        data: { name: 'name', founder: 'founder', founded: 2002 },
      },
      {
        type: SET_ABOUT_COMPANY_FETCH_STATE,
        state: LOADING_IS_DONE,
      },
    ];

    const store = mockStore({ aboutCompany: { data: {}, state: null } });

    await store.dispatch(fetchAboutCompanyData());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchAboutCompanyData action with error in response', () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/info', 500);

    const expectedActions = [
      {
        type: SET_ABOUT_COMPANY_FETCH_STATE,
        state: LOADING_IN_PROCESS,
      },
      {
        type: SET_ABOUT_COMPANY_FETCH_STATE,
        state: LOADING_ERROR,
      },
    ];

    const store = mockStore({ aboutCompany: { data: {}, state: null } });

    return store.dispatch(fetchAboutCompanyData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("fetchAboutCompanyDataIfNeeded fetches data when it wasn't fetched", async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/info', {
      body: { name: 'name', founder: 'founder', founded: 2002 },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: SET_ABOUT_COMPANY_FETCH_STATE,
        state: LOADING_IN_PROCESS,
      },
      {
        type: RECEIVE_ABOUT_COMPANY_DATA,
        data: { name: 'name', founder: 'founder', founded: 2002 },
      },
      {
        type: SET_ABOUT_COMPANY_FETCH_STATE,
        state: LOADING_IS_DONE,
      },
    ];

    const store = mockStore({ aboutCompany: { data: {}, state: null } });

    await store.dispatch(fetchAboutCompanyDataIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchAboutCompanyDataIfNeeded does not fetch data again after successful fetch', async () => {
    const store = mockStore({
      aboutCompany: { data: {}, state: LOADING_IS_DONE },
    });

    await store.dispatch(fetchAboutCompanyDataIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });

  test('fetchAboutCompanyDataIfNeeded action fetches data after error', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/info', {
      body: { name: 'name', founder: 'founder', founded: 2002 },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: SET_ABOUT_COMPANY_FETCH_STATE,
        state: LOADING_IN_PROCESS,
      },
      {
        type: RECEIVE_ABOUT_COMPANY_DATA,
        data: { name: 'name', founder: 'founder', founded: 2002 },
      },
      {
        type: SET_ABOUT_COMPANY_FETCH_STATE,
        state: LOADING_IS_DONE,
      },
    ];

    const store = mockStore({
      aboutCompany: { data: {}, state: LOADING_ERROR },
    });

    await store.dispatch(fetchAboutCompanyDataIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';

const mockStore = configureMockStore([thunk]);

describe('AboutCompany actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  test('setAboutCompanyFetchState action', () => {
    const expectedAction = {
      type: actions.SET_ABOUT_COMPANY_FETCH_STATE,
      state: actions.LoadingStates.LOADING,
    };

    expect(actions.setAboutCompanyFetchState(actions.LoadingStates.LOADING))
      .toEqual(expectedAction);
  });

  test('receiveAboutCompanyData action', () => {
    const data = { test: 'data' };
    const expectedAction = {
      type: actions.RECEIVE_ABOUT_COMPANY_DATA,
      data,
    };

    expect(actions.receiveAboutCompanyData(data))
      .toEqual(expectedAction);
  });

  test('fetchAboutCompanyData action', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/info', {
      body: { name: 'name', founder: 'founder', founded: 2002 },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_ABOUT_COMPANY_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_ABOUT_COMPANY_DATA, data: { name: 'name', founder: 'founder', founded: 2002 } },
      { type: actions.SET_ABOUT_COMPANY_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ aboutCompany: { data: {}, state: null } });

    await store.dispatch(actions.fetchAboutCompanyData());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchAboutCompanyData action with error in response', () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/info', 500);

    const expectedActions = [
      { type: actions.SET_ABOUT_COMPANY_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.SET_ABOUT_COMPANY_FETCH_STATE, state: actions.LoadingStates.ERROR },
    ];

    const store = mockStore({ aboutCompany: { data: {}, state: null } });

    return store.dispatch(actions.fetchAboutCompanyData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('fetchAboutCompanyDataIfNeeded fetches data when it wasn\'t fetched', async () => {
    fetchMock.getOnce('https://api.spacexdata.com/v3/info', {
      body: { name: 'name', founder: 'founder', founded: 2002 },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.SET_ABOUT_COMPANY_FETCH_STATE, state: actions.LoadingStates.LOADING },
      { type: actions.RECEIVE_ABOUT_COMPANY_DATA, data: { name: 'name', founder: 'founder', founded: 2002 } },
      { type: actions.SET_ABOUT_COMPANY_FETCH_STATE, state: actions.LoadingStates.DONE },
    ];

    const store = mockStore({ aboutCompany: { data: {}, state: null } });

    await store.dispatch(actions.fetchAboutCompanyDataIfNeeded());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('fetchAboutCompanyDataIfNeeded does not fetch data again after successful fetch', async () => {
    const store = mockStore({ aboutCompany: { data: {}, state: actions.LoadingStates.DONE } });

    await store.dispatch(actions.fetchAboutCompanyDataIfNeeded());
    expect(store.getActions().length).toEqual(0);
  });
});

import reducer from './reducers.ts';
import {
  SET_ABOUT_COMPANY_FETCH_STATE,
  RECEIVE_ABOUT_COMPANY_DATA,
} from './types.ts';
import { LOADING_ERROR } from '../types.ts';

describe('aboutCompany reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      data: null,
    });
  });

  it('should handle SET_ABOUT_COMPANY_FETCH_STATE', () => {
    expect(
      reducer(
        { state: null },
        {
          type: SET_ABOUT_COMPANY_FETCH_STATE,
          state: LOADING_ERROR,
        }
      )
    ).toEqual({ state: LOADING_ERROR });
  });

  it('should handle RECEIVE_ABOUT_COMPANY_DATA', () => {
    expect(
      reducer(
        { data: {} },
        {
          type: RECEIVE_ABOUT_COMPANY_DATA,
          data: { name: 'name', founder: 'founder', founded: 2002 },
        }
      )
    ).toEqual({ data: { name: 'name', founder: 'founder', founded: 2002 } });
  });
});

import reducer, { dragonById } from './dragons';
import {
  SET_DRAGONS_FETCH_STATE,
  RECEIVE_DRAGONS_DATA,
  LoadingStates,
} from '../actions';
import dragonsList from '../../../__tests__/data/dragons';

describe('dragons reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      data: [],
    });
  });

  it('should handle SET_DRAGONS_FETCH_STATE', () => {
    expect(reducer(
      { state: null },
      {
        type: SET_DRAGONS_FETCH_STATE,
        state: LoadingStates.ERROR,
      },
    )).toEqual({ state: LoadingStates.ERROR });
  });

  it('should handle RECEIVE_DRAGONS_DATA', () => {
    expect(reducer(
      { data: null },
      {
        type: RECEIVE_DRAGONS_DATA,
        data: dragonsList,
      },
    )).toEqual({ data: dragonsList });
  });

  it('filters dragon by id', () => {
    expect(dragonById(dragonsList, dragonsList[1].id)).toEqual(dragonsList[1]);
  });

  it('throws as error when filter by unknown id', () => {
    expect(() => dragonById(dragonsList, 'unknown id')).toThrow();
  });
});

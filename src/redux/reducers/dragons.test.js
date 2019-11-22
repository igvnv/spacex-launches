import reducer, { dragonById } from './dragons';
import {
  SET_DRAGONS_FETCH_STATE,
  RECEIVE_DRAGONS_DATA,
  LoadingStates,
} from '../actions';

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
    const dragonsList = [{ id: 'dragon1' }, { id: 'dragon2' }];

    expect(reducer(
      { data: null },
      {
        type: RECEIVE_DRAGONS_DATA,
        data: dragonsList,
      },
    )).toEqual({ data: dragonsList });
  });

  it('filters dragon by id', () => {
    const dragon1 = { id: 'dragon1' };
    const dragon2 = { id: 'dragon2' };
    const dragonsList = [dragon1, dragon2];

    expect(dragonById(dragonsList, 'dragon2')).toEqual(dragon2);
  });

  it('throws as error when filter by unknown id', () => {
    const dragon1 = { id: 'dragon1' };
    const dragon2 = { id: 'dragon2' };
    const dragonsList = [dragon1, dragon2];

    expect(() => dragonById(dragonsList, 'dragon2000')).toThrow();
  });
});

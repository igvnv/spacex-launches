import reducer, { shipById } from './ships';
import {
  SET_SHIPS_FETCH_STATE,
  RECEIVE_SHIPS_DATA,
  LoadingStates,
} from '../actions';
import shipsList from '../../../__tests__/data/ships';

describe('ships reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      data: [],
    });
  });

  it('should handle SET_SHIPS_FETCH_STATE', () => {
    expect(
      reducer(
        { state: null },
        {
          type: SET_SHIPS_FETCH_STATE,
          state: LoadingStates.ERROR,
        }
      )
    ).toEqual({ state: LoadingStates.ERROR });
  });

  it('should handle RECEIVE_SHIPS_DATA', () => {
    expect(
      reducer(
        { data: null },
        {
          type: RECEIVE_SHIPS_DATA,
          data: shipsList,
        }
      )
    ).toEqual({ data: shipsList });
  });

  it('filters ship by id', () => {
    expect(shipById(shipsList, shipsList[2].ship_id)).toEqual(shipsList[2]);
  });

  it('throws as error when filter by unknown id', () => {
    expect(() => shipById(shipsList, 'unknown id')).toThrow();
  });
});

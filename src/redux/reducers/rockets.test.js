import reducer, { rocketById } from './rockets';
import {
  SET_ROCKETS_FETCH_STATE,
  RECEIVE_ROCKETS_DATA,
  LoadingStates,
} from '../actions';
import rocketsList from '../../../__tests__/data/rockets';

describe('rockets reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      data: [],
    });
  });

  it('should handle SET_ROCKETS_FETCH_STATE', () => {
    expect(
      reducer(
        { state: null },
        {
          type: SET_ROCKETS_FETCH_STATE,
          state: LoadingStates.ERROR,
        }
      )
    ).toEqual({ state: LoadingStates.ERROR });
  });

  it('should handle RECEIVE_ROCKETS_DATA', () => {
    expect(
      reducer(
        { data: null },
        {
          type: RECEIVE_ROCKETS_DATA,
          data: rocketsList,
        }
      )
    ).toEqual({ data: rocketsList });
  });

  it('filters rocket by id', () => {
    expect(rocketById(rocketsList, rocketsList[1].rocket_id)).toEqual(
      rocketsList[1]
    );
  });

  it('throws as error when filter by unknown id', () => {
    expect(() => rocketById(rocketsList, 'unknown id')).toThrow();
  });
});

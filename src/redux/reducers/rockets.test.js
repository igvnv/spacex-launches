import reducer, { rocketById } from './rockets';
import {
  SET_ROCKETS_FETCH_STATE,
  RECEIVE_ROCKETS_DATA,
  LoadingStates,
} from '../actions';

describe('rockets reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      data: [],
    });
  });

  it('should handle SET_ROCKETS_FETCH_STATE', () => {
    expect(reducer(
      { state: null },
      {
        type: SET_ROCKETS_FETCH_STATE,
        state: LoadingStates.ERROR,
      },
    )).toEqual({ state: LoadingStates.ERROR });
  });

  it('should handle RECEIVE_ROCKETS_DATA', () => {
    const rocketsList = [{ rocket_id: 'falcon1' }, { rocket_id: 'falcon9' }];

    expect(reducer(
      { data: null },
      {
        type: RECEIVE_ROCKETS_DATA,
        data: rocketsList,
      },
    )).toEqual({ data: rocketsList });
  });

  it('filters rocket by id', () => {
    const rocket1 = { rocket_id: 'falcon_1', rocket_name: 'Falcon 1' };
    const rocket2 = { rocket_id: 'falcon_9', rocket_name: 'Falcon 9' };
    const rockets = [rocket1, rocket2];

    expect(rocketById(rockets, 'falcon_9')).toEqual(rocket2);
  });

  it('throws as error when filter by unknown id', () => {
    const rocket1 = { rocket_id: 'falcon_1', rocket_name: 'Falcon 1' };
    const rocket2 = { rocket_id: 'falcon_9', rocket_name: 'Falcon 9' };
    const rockets = [rocket1, rocket2];

    expect(() => rocketById(rockets, 'falcon_heavy')).toThrow();
  });
});

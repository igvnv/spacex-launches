import reducer, { launchPadById } from './launchPads';
import {
  SET_LAUNCH_PADS_FETCH_STATE,
  RECEIVE_LAUNCH_PADS_DATA,
  LoadingStates,
} from '../actions';
import launchPadsList from '../../../__tests__/helpers/launchpads';

describe('launch pads reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      data: [],
    });
  });

  it('should handle SET_LAUNCH_PADS_FETCH_STATE', () => {
    expect(reducer(
      { state: null },
      {
        type: SET_LAUNCH_PADS_FETCH_STATE,
        state: LoadingStates.ERROR,
      },
    )).toEqual({ state: LoadingStates.ERROR });
  });

  it('should handle RECEIVE_LAUNCH_PADS_DATA', () => {
    expect(reducer(
      { data: null },
      {
        type: RECEIVE_LAUNCH_PADS_DATA,
        data: launchPadsList,
      },
    )).toEqual({ data: launchPadsList });
  });

  it('filters launch pad by id', () => {
    expect(launchPadById(launchPadsList, launchPadsList[2].id)).toEqual(launchPadsList[2]);
  });

  it('throws as error when filter by unknown id', () => {
    expect(() => launchPadById(launchPadsList, 'unknown id')).toThrow();
  });
});

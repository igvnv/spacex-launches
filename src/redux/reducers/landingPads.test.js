import reducer, { landingPadById } from './landingPads';
import {
  SET_LANDING_PADS_FETCH_STATE,
  RECEIVE_LANDING_PADS_DATA,
  LoadingStates,
} from '../actions';
import landingPadsList from '../../../__tests__/helpers/landingpads';

describe('landing pads reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      state: null,
      data: [],
    });
  });

  it('should handle SET_LANDING_PADS_FETCH_STATE', () => {
    expect(reducer(
      { state: null },
      {
        type: SET_LANDING_PADS_FETCH_STATE,
        state: LoadingStates.ERROR,
      },
    )).toEqual({ state: LoadingStates.ERROR });
  });

  it('should handle RECEIVE_LANDING_PADS_DATA', () => {
    expect(reducer(
      { data: null },
      {
        type: RECEIVE_LANDING_PADS_DATA,
        data: landingPadsList,
      },
    )).toEqual({ data: landingPadsList });
  });

  it('filters landing pad by id', () => {
    expect(landingPadById(landingPadsList, landingPadsList[2].id)).toEqual(landingPadsList[2]);
  });

  it('throws as error when filter by unknown id', () => {
    expect(() => landingPadById(landingPadsList, 'unknown id')).toThrow();
  });
});

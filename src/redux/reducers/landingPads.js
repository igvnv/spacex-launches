import {
  SET_LANDING_PADS_FETCH_STATE,
  RECEIVE_LANDING_PADS_DATA,
} from '../actions';

const initialState = {
  data: [],
  state: null,
};

export function landingPadById(landingPadsList, landingPadId) {
  const landingPad = landingPadsList.filter((lp) => lp.id === landingPadId)[0];
  if (landingPad === undefined) throw new Error(`Landing pad '${landingPadId}' not found`);
  return landingPad;
}

function landingPads(state = initialState, action) {
  switch (action.type) {
    case SET_LANDING_PADS_FETCH_STATE:
      return { ...state, ...{ state: action.state } };

    case RECEIVE_LANDING_PADS_DATA:
      return { ...state, ...{ data: action.data } };

    default:
      return state;
  }
}

export default landingPads;

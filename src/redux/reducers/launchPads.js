import {
  SET_LAUNCH_PADS_FETCH_STATE,
  RECEIVE_LAUNCH_PADS_DATA,
} from '../actions';

const initialState = {
  data: [],
  state: null,
};

export function launchPadById(launchPadsList, launchPadId) {
  const launchPad = launchPadsList.filter((lp) => lp.id === +launchPadId)[0];
  if (launchPad === undefined) throw new Error(`Launch pad '${launchPadId}' not found`);
  return launchPad;
}

function launchPads(state = initialState, action) {
  switch (action.type) {
    case SET_LAUNCH_PADS_FETCH_STATE:
      return { ...state, ...{ state: action.state } };

    case RECEIVE_LAUNCH_PADS_DATA:
      return { ...state, ...{ data: action.data } };

    default:
      return state;
  }
}

export default launchPads;

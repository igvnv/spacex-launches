import { SET_DRAGONS_FETCH_STATE, RECEIVE_DRAGONS_DATA } from '../actions';

const initialState = {
  data: [],
  state: null,
};

export function dragonById(dragonsList, dragonId) {
  const dragon = dragonsList.filter((d) => d.id === dragonId)[0];
  if (dragon === undefined) throw new Error(`Dragon '${dragonId}' not found`);
  return dragon;
}

function dragons(state = initialState, action) {
  switch (action.type) {
    case SET_DRAGONS_FETCH_STATE:
      return { ...state, ...{ state: action.state } };

    case RECEIVE_DRAGONS_DATA:
      return { ...state, ...{ data: action.data } };

    default:
      return state;
  }
}

export default dragons;

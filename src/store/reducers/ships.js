import { SET_SHIPS_FETCH_STATE, RECEIVE_SHIPS_DATA } from '../actions';

const initialState = {
  data: [],
  state: null,
};

export function shipById(shipsList, shipId) {
  const ship = shipsList.filter((s) => s.ship_id === shipId)[0];
  if (ship === undefined) throw new Error(`Ship '${shipId}' not found`);
  return ship;
}

function ships(state = initialState, action) {
  switch (action.type) {
    case SET_SHIPS_FETCH_STATE:
      return { ...state, ...{ state: action.state } };

    case RECEIVE_SHIPS_DATA:
      return { ...state, ...{ data: action.data } };

    default:
      return state;
  }
}

export default ships;

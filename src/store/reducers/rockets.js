import { SET_ROCKETS_FETCH_STATE, RECEIVE_ROCKETS_DATA } from '../actions';

const initialState = {
  data: [],
  state: null,
};

export function rocketById(rocketsList, rocketId) {
  const rocket = rocketsList.filter((r) => r.rocket_id === rocketId)[0];
  if (rocket === undefined) throw new Error(`Rocket '${rocketId}' not found`);
  return rocket;
}

function rockets(state = initialState, action) {
  switch (action.type) {
    case SET_ROCKETS_FETCH_STATE:
      return { ...state, ...{ state: action.state } };

    case RECEIVE_ROCKETS_DATA:
      return { ...state, ...{ data: action.data } };

    default:
      return state;
  }
}

export default rockets;

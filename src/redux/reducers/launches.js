import {
  SET_LAUNCHES_FETCH_STATE,
  SET_LAUNCHES_VISIBILITY_FILTER,
  RECEIVE_LAUNCHES_DATA,
  LaunchesVisibilityFilter,
} from '../actions';

const initialState = {
  state: null,
  visibilityFilter: LaunchesVisibilityFilter.ALL,
  launches: [],
};

function launches(state = initialState, action) {
  switch (action.type) {
    case SET_LAUNCHES_FETCH_STATE:
      return { ...state, ...{ state: action.state } };

    case RECEIVE_LAUNCHES_DATA:
      return { ...state, ...{ launches: action.launches } };

    case SET_LAUNCHES_VISIBILITY_FILTER:
      return { ...state, ...{ visibilityFilter: action.visibilityFilter } };

    default:
      return state;
  }
}

export default launches;

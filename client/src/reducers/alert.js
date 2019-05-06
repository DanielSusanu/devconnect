import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // Add alert to state
      return [...state, payload];
    case REMOVE_ALERT:
      // Remove alert from state and return state
      return state.filter(alert => alert.id !== payload);
    default:
      // Return state
      return state;
  }
}

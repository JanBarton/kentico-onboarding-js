import { List } from 'immutable';

import {
  ADD_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';

export const nodesIdsReducer = (state = List(), action) => {
  switch (action.type) {
    case ADD_NODE:
      return state.push(action.payload.id);
    case DELETE_NODE: {
      const index = state.indexOf(action.payload.id);
      if (index === -1) {
        return state;
      }
      return state.delete(index);
    }
    default:
      return state;
  }
};

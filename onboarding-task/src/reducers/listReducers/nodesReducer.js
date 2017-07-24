import { OrderedMap } from 'immutable';

import {
  ADD_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';
import { NodeContent } from '../../models/NodeContent';

export const nodesReducer = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_NODE: {
      const newNode = new NodeContent({
        id: action.payload.id,
        text: action.payload.text,
      });

      return state.set(newNode.id, newNode);
    }
    case DELETE_NODE:
      return state.delete(action.payload.id);
    case SAVE_NODE:
      return state.setIn([action.payload.id, 'text'], action.payload.text);
    default:
      return state;
  }
};

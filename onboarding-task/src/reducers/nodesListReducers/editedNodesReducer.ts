import { OrderedMap } from 'immutable';

import { IAction } from '../../@types/IAction';
import {
  ADD_NODE_OPTIMISTIC,
  ADD_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
  GET_NODES_SUCCESS,
  TOGGLE_NODE,
  UPDATE_NODE_SUCCESS
} from '../../constants/actionTypes';
import { INodeContent } from '../../models/NodeContent';

export type IEditedNodes = OrderedMap<Guid, boolean>;

export const editedNodesReducer = (state: IEditedNodes = OrderedMap<Guid, boolean>(), action: IAction): IEditedNodes => {
  switch (action.type) {
    case DELETE_NODE_SUCCESS:
      return state.delete(action.payload.id);

    case UPDATE_NODE_SUCCESS:
    case TOGGLE_NODE: {
      const oldNodeStatus = state.get(action.payload.id);

      return state.set(action.payload.id, !oldNodeStatus);
    }

    case GET_NODES_SUCCESS:
      return action.payload.nodes
        .reduce(
          (map: IEditedNodes, node: INodeContent) => map.set(node.id, false),
          OrderedMap<Guid, boolean>()
        );

    case ADD_NODE_OPTIMISTIC:
      return state.set(action.payload.id, false);

    case ADD_NODE_SUCCESS: {
      const temporaryState = state.delete(action.payload.temporaryId);

      return temporaryState.set(action.payload.id, false);
    }

    default:
      return state;
  }
};

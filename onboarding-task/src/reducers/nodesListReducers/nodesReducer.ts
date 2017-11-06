import { OrderedMap } from 'immutable';

import {
  GET_NODES_SUCCESS,
  ADD_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
  ADD_NODE_OPTIMISTIC,
  UPDATE_NODE_SUCCESS,
} from '../../constants/actionTypes';
import { INodeContent, NodeContent } from '../../models/NodeContent';
import { IAction } from '../../@types/IAction';

export type INodes = OrderedMap<Guid, NodeContent>;

export const nodesReducer = (state: INodes = OrderedMap<Guid, NodeContent>(), action: IAction): INodes => {
  switch (action.type) {
    case DELETE_NODE_SUCCESS:
      return state.delete(action.payload.id);

    case UPDATE_NODE_SUCCESS: {
      const newNode = state.get(action.payload.id).with(action.payload);

      return state.set(newNode.id, newNode);
    }

    case GET_NODES_SUCCESS:
      return action.payload.nodes
        .reduce(
          (map: INodes, node: INodeContent) => map.set(node.id, new NodeContent(node)),
          OrderedMap<Guid, NodeContent>()
        );

    case ADD_NODE_OPTIMISTIC: {
      const newNode = new NodeContent(action.payload);

      return state.set(newNode.id, newNode);
    }

    case ADD_NODE_SUCCESS: {
      const temporaryState = state.delete(action.payload.temporaryId);
      const persistedNode = new NodeContent({id: action.payload.id, text: action.payload.text});

      return temporaryState.set(persistedNode.id, persistedNode);
    }

    default:
      return state;
  }
};

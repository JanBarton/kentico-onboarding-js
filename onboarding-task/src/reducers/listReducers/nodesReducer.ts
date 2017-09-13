import { OrderedMap } from 'immutable';

import {
  ADD_NODE,
  SAVE_NODE,
  DELETE_NODE,
  FETCH_NODES_REQUEST,
} from '../../actions/actionTypes';
import { NodeContent } from '../../models/NodeContent';
import { IAction } from '../../actions/IAction';

export type INodes = OrderedMap<IdType, NodeContent>;

export const nodesReducer = (state: INodes = OrderedMap<IdType, NodeContent>(), action: IAction): INodes => {
  switch (action.type) {
    case ADD_NODE: {
      const newNode = new NodeContent(action.payload);

      return state.set(newNode.id, newNode);
    }
    case DELETE_NODE:
      return state.delete(action.payload.id);
    case SAVE_NODE: {
      const newNode = state.get(action.payload.id).with(action.payload);

      return state.set(newNode.id, newNode);
    }
    case FETCH_NODES_REQUEST: {
      return action.payload.nodes
        .reduce(
          (map: any, node: any) => map.set(node.id, new NodeContent(node)),
          OrderedMap<IdType, NodeContent>()
        );
    }
    default:
      return state;
  }
};

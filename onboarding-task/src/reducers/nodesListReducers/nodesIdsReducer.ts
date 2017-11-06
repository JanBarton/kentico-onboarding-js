import { List } from 'immutable';

import {
  DELETE_NODE_SUCCESS,
  GET_NODES_SUCCESS,
  ADD_NODE_OPTIMISTIC,
  ADD_NODE_SUCCESS,
} from '../../constants/actionTypes';
import { IAction } from '../../@types/IAction';
import { INodeContent } from '../../models/NodeContent';

export type INodesIds = List<Guid>;

export const nodesIdsReducer = (state: INodesIds = List<Guid>(), action: IAction): INodesIds => {
  switch (action.type) {
    case DELETE_NODE_SUCCESS:
      return state.filter(nodeId => nodeId !== action.payload.id).toList();

    case GET_NODES_SUCCESS:
      return action.payload.nodes
        .reduce(
          (list: INodesIds, node: INodeContent) => list.push(node.id),
          List<Guid>()
        );

    case ADD_NODE_SUCCESS: {
      const temporaryState = state.filter(nodeId => nodeId !== action.payload.temporaryId).toList();
      return temporaryState.push(action.payload.id);
    }

    case ADD_NODE_OPTIMISTIC:
      return state.push(action.payload.id);

    default:
      return state;
  }
};

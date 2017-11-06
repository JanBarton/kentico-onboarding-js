import { OrderedMap } from 'immutable';

import { IAction } from '../../@types/IAction';
import {
  ADD_NODE_OPTIMISTIC,
  ADD_NODE_SUCCESS,
  DELETE_NODE_SUCCESS,
  GET_NODES_SUCCESS
} from '../../constants/actionTypes';
import { INodeContent } from '../../models/NodeContent';

export type IPersistedNodes = OrderedMap<Guid, boolean>;

export const persistedNodesReducer = (state: IPersistedNodes = OrderedMap<Guid, boolean>(), action: IAction): IPersistedNodes => {
  switch (action.type) {
    case DELETE_NODE_SUCCESS:
      return state.delete(action.payload.id);

    case GET_NODES_SUCCESS:
      return action.payload.nodes
        .reduce(
          (map: IPersistedNodes, node: INodeContent) => map.set(node.id, true),
          OrderedMap<Guid, boolean>()
        );

    case ADD_NODE_OPTIMISTIC:
      return state.set(action.payload.id, false);

    case ADD_NODE_SUCCESS: {
    const temporaryState = state.delete(action.payload.temporaryId);

    return temporaryState.set(action.payload.id, true);
  }

    default:
      return state;
  }
};

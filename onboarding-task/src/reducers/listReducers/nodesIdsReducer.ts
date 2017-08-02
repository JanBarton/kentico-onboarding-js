import { List } from 'immutable';

import {
  ADD_NODE,
  DELETE_NODE,
} from '../../actions/actionTypes';
import { IAction } from '../../actions/IAction';

export type INodesIds = List<IdType>;

export const nodesIdsReducer = (state: INodesIds = List<IdType>(), action: IAction): INodesIds => {
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

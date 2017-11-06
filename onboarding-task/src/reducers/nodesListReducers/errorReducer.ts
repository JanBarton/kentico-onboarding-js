import { OrderedMap } from 'immutable';

import { IAction } from '../../@types/IAction';
import {
  GET_NODES_FAILURE,
  DISMISS_ERROR,
  ADD_NODE_FAILURE,
  DELETE_NODE_FAILURE, UPDATE_NODE_FAILURE
} from '../../constants/actionTypes';

export type IErrorsMap = OrderedMap<Guid, string>;

export const errorReducer = (state: IErrorsMap = OrderedMap<Guid, string>(), action: IAction): IErrorsMap => {
  switch (action.type) {
    case DISMISS_ERROR:
      return state.delete(action.payload.id);

    case UPDATE_NODE_FAILURE:
    case DELETE_NODE_FAILURE:
    case GET_NODES_FAILURE:
    case ADD_NODE_FAILURE:
      return state.set(action.payload.id, action.payload.text);

    default:
      return state;
  }
};

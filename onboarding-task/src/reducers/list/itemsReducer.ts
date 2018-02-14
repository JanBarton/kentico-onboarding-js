import { OrderedMap } from 'immutable';

import { ItemData } from '../../models/ItemData';
import { IAction } from '../../interfaces/IAction';
import { itemReducer } from './itemReducer';
import {
  DELETE_REQUEST_SUCCESS, FETCH_REQUEST_SUCCESS,
  CREATE_REQUEST_STARTED, CREATE_REQUEST_SUCCESS, UPDATE_REQUEST_STARTED,
} from '../../actions/actionTypes';
import { parseApiResponseJson } from '../../utils/parseApiResponseJson';

export type ItemsDataMap = OrderedMap<string, ItemData>;

const defaultState = OrderedMap<string, ItemData>();

export const itemsReducer = (state: ItemsDataMap = defaultState, action: IAction): ItemsDataMap => {
  switch (action.type) {
    case DELETE_REQUEST_SUCCESS:
      return state.remove(action.payload.id);

    case CREATE_REQUEST_STARTED: {
      const newItem = new ItemData({
        id: action.payload.optimisticId,
        text: action.payload.text,
      });
      return state.set(action.payload.optimisticId, newItem);
    }

    case UPDATE_REQUEST_STARTED: {
      const itemToEdit = state.get(action.payload.id);

      if (!itemToEdit) {
        return state;
      }

      const editedItem = itemReducer(itemToEdit, action);
      return state.set(action.payload.id, editedItem);
    }

    case CREATE_REQUEST_SUCCESS: {
      state = state.remove(action.payload.formerId);
      const newItem = new ItemData(action.payload.item);

      return state.set(newItem.id, newItem);
    }

    case FETCH_REQUEST_SUCCESS: {
      return parseApiResponseJson(action.payload.items);
    }

    default:
      return state;
  }
};

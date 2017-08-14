import { OrderedMap } from 'immutable';

import { ItemData } from '../../models/ItemData';
import { IAction } from '../../interfaces/IAction';
import { itemReducer } from './itemReducer';
import {
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
} from '../../actions/actionTypes';

export type ItemsDataMap = OrderedMap<string, ItemData>;

const defaultState = OrderedMap<string, ItemData>();

export const itemsReducer = (state: ItemsDataMap = defaultState, action: IAction): ItemsDataMap => {
  switch (action.type) {
    case ITEM_DELETED:
      return state.remove(action.payload.id);

    case ITEM_CREATED: {
      const newItem = new ItemData({
        id: action.payload.newId,
        text: action.payload.text,
      });
      return state.set(action.payload.newId, newItem);
    }

    case ITEM_CHANGE_SAVED: {
      const itemToEdit = state.get(action.payload.id);

      if (!itemToEdit) {
        return state;
      }

      const editedItem = itemReducer(itemToEdit, action);
      return state.set(action.payload.id, editedItem);
    }

    default:
      return state;
  }
};

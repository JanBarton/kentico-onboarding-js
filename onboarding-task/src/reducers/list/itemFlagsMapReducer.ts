import { OrderedMap } from 'immutable';

import { ItemFlags } from '../../models/ItemFlags';
import { IAction } from '../../interfaces/IAction';
import { itemFlagsReducer } from './itemFlagsReducer';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_MAKE_EDITABLE,
} from '../../actions/actionTypes';

export type ItemsFlagsMap = OrderedMap<string, ItemFlags>;

const defaultState = OrderedMap<string, ItemFlags>();

export const itemFlagsMapReducer = (state: ItemsFlagsMap = defaultState, action: IAction): ItemsFlagsMap => {
  switch (action.type) {
    case ITEM_DELETED:
      return state.remove(action.payload.id);

    case ITEM_CREATED: {
      const newItem = new ItemFlags();
      return state.set(action.payload.newId, newItem);
    }

    case ITEM_MAKE_EDITABLE:
    case ITEM_CHANGE_CANCELLED:
    case ITEM_CHANGE_SAVED: {
      const flagsToEdit = state.get(action.payload.id);

      if (!flagsToEdit) {
        return state;
      }

      const editedInfo = itemFlagsReducer(flagsToEdit, action);
      return state.set(action.payload.id, editedInfo);
    }

    default:
      return state;
  }
};

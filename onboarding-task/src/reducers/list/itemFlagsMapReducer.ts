import { OrderedMap } from 'immutable';

import { ItemFlags } from '../../models/ItemFlags';
import { IAction } from '../../interfaces/IAction';
import { itemFlagsReducer } from './itemFlagsReducer';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCESS,
  FETCH_REQUEST_SUCCESS,
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,
  CREATE_REQUEST_FAIL,
  CREATE_REQUEST_STARTED,
  CREATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_STARTED,
  UPDATE_REQUEST_SUCCESS,
} from '../../actions/actionTypes';
import { IItemDTO } from '../../interfaces/IItemDTO';

export type ItemsFlagsMap = OrderedMap<string, ItemFlags>;

const defaultState = OrderedMap<string, ItemFlags>();

export const itemFlagsMapReducer = (state: ItemsFlagsMap = defaultState, action: IAction): ItemsFlagsMap => {
  switch (action.type) {
    case DELETE_REQUEST_SUCCESS:
      return state.remove(action.payload.id);

    case CREATE_REQUEST_STARTED: {
      const newItem = new ItemFlags({isStored: false});
      return state.set(action.payload.optimisticId, newItem);
    }

    case CREATE_REQUEST_SUCCESS: {
      const newItem = new ItemFlags({isStored: true});

      return state
        .remove(action.payload.formerId)
        .set(action.payload.item.id, newItem);
    }

    case FETCH_REQUEST_SUCCESS: {
      action.payload.items.forEach((item: IItemDTO) => {
        state = state.set(item.id, new ItemFlags({isStored: true}));
      });

      return state;
    }

    case ITEM_MAKE_EDITABLE:
    case ITEM_CHANGE_CANCELLED:
    case DELETE_REQUEST_STARTED:
    case UPDATE_REQUEST_STARTED:
    case UPDATE_REQUEST_SUCCESS:
    case UPDATE_REQUEST_FAIL:
    case DELETE_REQUEST_FAIL:
    case CREATE_REQUEST_FAIL: {
      return state
        .update(action.payload.id, flagsToEdit =>
          flagsToEdit && itemFlagsReducer(flagsToEdit, action));
    }

    default:
      return state;
  }
};

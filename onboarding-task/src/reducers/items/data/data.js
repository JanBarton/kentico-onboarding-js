import { Map } from 'immutable';
import {
  CREATE_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../../../constants/actionTypes';
import { item } from './item';

export const data = (state = new Map(), action) => {
  switch (action.type) {
    case CREATE_ITEM: {
      const newItem = action.payload.item;

      return state.set(newItem.id, newItem);
    }
    case UPDATE_ITEM: {
      const existingItem = state.get(action.payload.item.id);
      const newItem = item(existingItem, action);

      return state.set(action.payload.item.id, newItem);
    }
    case DELETE_ITEM:
      return state.delete(action.payload.itemId);
    default:
      return state;
  }
};

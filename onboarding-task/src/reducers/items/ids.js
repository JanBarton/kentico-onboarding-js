import { List } from 'immutable';
import {
  CREATE_ITEM,
  DELETE_ITEM,
} from '../../constants/actionTypes';

export const ids = (state = new List(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return state.push(action.payload.item.id);
    case DELETE_ITEM:
      return state.filter(id => (
        id !== action.payload.itemId
      ));
    default:
      return state;
  }
};

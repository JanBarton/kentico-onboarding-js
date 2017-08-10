import { List } from 'immutable';
import {
  CREATE_ITEM,
  DELETE_ITEM,
} from '../../constants/actionTypes';
import { Store } from '../../interfaces';

export const ids: Store.Ids = (state = List<string>(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return state.push(action.payload.item.id);
    case DELETE_ITEM:
      return state.filter(id => (
        id !== action.payload.id
      )).toList();
    default:
      return state;
  }
};

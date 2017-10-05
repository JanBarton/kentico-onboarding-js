import { Map } from 'immutable';

import {
  FetchData,
  ItemActions,
  LocalItemActions,
} from '../../../constants/actionTypes';
import { flag } from './flag';

import { Reducer } from '../../reducers';
import { ListItemFlags } from '../../../models/ListItemFlags';
import { ListItemData } from '../../../models/ListItemData';

export const flags: Reducer.Flags = (state = Map(), action) => {
  switch (action.type) {
    case LocalItemActions.TOGGLE_BEING_EDITED: {
      const existingFlags = state.get(action.payload.localId);
      const newFlags = flag(existingFlags, action);

      return state.set(action.payload.localId, newFlags);
    }

    case ItemActions.DELETE_ITEM_TO_SERVER:
    case ItemActions.POST_ITEM_TO_SERVER:
    case ItemActions.PUT_ITEM_TO_SERVER:
    case LocalItemActions.CREATE_ITEM: {
      const newFlags = flag(undefined, action);

      return state.set(action.payload.item.localId, newFlags);
    }

    case LocalItemActions.DELETE_ITEM:
      return state.delete(action.payload.id);

    case FetchData.HAS_SUCCEEDED: {
      action.payload.items.forEach((item: ListItemData) => {
        state = state.set(item.localId, new ListItemFlags());
      });

      return state;
    }

    default:
      return state;
  }
};

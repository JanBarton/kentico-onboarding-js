import { AnyAction } from 'redux';
import * as Immutable from 'immutable';
import { ItemDelete, ItemCancel, ItemSave, ItemClick, AddNewItem } from '../constants/actionTypes';
import { IItem } from '../reducers/IStore';

const initialState: Immutable.List<IItem> = Immutable.List();

export function items(state: Immutable.List<IItem> = initialState, action: AnyAction): Immutable.List<IItem> {
  switch (action.type) {
    case ItemDelete: {
      const indexOfItemToDelete = state.findIndex((item: IItem) => item.id === action.payload.itemId);
      return state.delete(indexOfItemToDelete);
    }

    case ItemCancel: {
      const indexOfCanceledItem = state.findIndex((item: IItem) => item.id === action.payload.itemId);
      return state.update(indexOfCanceledItem, (oldItem) => {
        return {
          ...oldItem,
          isBeingEdited: false,
        };
      });
    }

    case ItemSave: {
      const indexOfSavedItem = state.findIndex((item: IItem) => item.id === action.payload.itemId);
      return state.update(indexOfSavedItem, (oldItem) => {
        return {
          ...oldItem,
          text: action.payload.text,
          isBeingEdited: false,
        };
      });
    }
    case ItemClick: {
      const indexOfClickedItem = state.findIndex((item: IItem) => item.id === action.payload.itemId);
      return state.update(indexOfClickedItem, (oldItem) => {
        return {
          ...oldItem,
          isBeingEdited: true,
        };
      });
    }
    case AddNewItem: {
      const newItem = {
        text: action.payload.text,
        isBeingEdited: false,
        id: action.payload.id,
      };
      return state.push(newItem);
    }
    default:
      return state;
  }
}

// type Action = {
//  readonly type: string;
//  readonly payload: {
//    readonly itemId: string;
//  };
// };

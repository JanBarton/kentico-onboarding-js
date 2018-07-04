import { AnyAction } from 'redux';
import * as Immutable from 'immutable';
import { ItemDelete, ItemSave, ItemCancel} from '../constants/actionTypes';
import { IItem } from '../reducers/IStore';


export function listItems(state: Immutable.List<IItem>, action: AnyAction): Immutable.List<IItem> {
  switch (action.type) {
    case ItemDelete: {
      const indexOfItemToDelete = state.findIndex((item: IItem) => item.id === action.payload.itemId);
      return state.delete(indexOfItemToDelete);
    }
    case ItemCancel: {
      const oldItem = action.payload.items;
      const indexOfCanceledItem = state.findIndex((item: IItem) => item.id === action.payload.itemId);
      return state.update(indexOfCanceledItem, (oldItem) => {

      }); // tady chybi veci z tama
    }
    case ItemSave: {
      const oldItem = action.payload.items;
      const indexOfSaveItem = oldItem.findIndex((item: IItem) => item.id === action.payload.itemId);

      return state;
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

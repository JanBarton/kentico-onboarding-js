import { ItemFlags } from '../../models/ItemFlags';
import { IAction } from '../../interfaces/IAction';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_MAKE_EDITABLE,
} from '../../actions/actionTypes';

const defaultState = new ItemFlags();

export const itemFlagsReducer = (state: ItemFlags = defaultState, action: IAction): ItemFlags => {
  switch (action.type) {
    case ITEM_MAKE_EDITABLE:
      return state.typedMerge({isBeingEdited: true});

    case ITEM_CHANGE_CANCELLED:
    case ITEM_CHANGE_SAVED:
      return state.typedMerge({isBeingEdited: false});

    default:
      return state;
  }
};

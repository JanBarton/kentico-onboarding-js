import { IAction } from '../../interfaces/IAction';
import { ItemData } from '../../models/ItemData';
import { ITEM_CHANGE_SAVED } from '../../actions/actionTypes';

const defaultState = new ItemData();

export const itemReducer = (state: ItemData = defaultState, action: IAction): ItemData => {
  switch (action.type) {
    case ITEM_CHANGE_SAVED:
      return state.typedMerge({ text: action.payload.text });

    default:
      return state;
  }
};

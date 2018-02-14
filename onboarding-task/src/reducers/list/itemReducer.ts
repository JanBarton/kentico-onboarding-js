import { IAction } from '../../interfaces/IAction';
import { ItemData } from '../../models/ItemData';
import { UPDATE_REQUEST_STARTED } from '../../actions/actionTypes';

const defaultState = new ItemData();

export const itemReducer = (state: ItemData = defaultState, action: IAction): ItemData => {
  switch (action.type) {
    case UPDATE_REQUEST_STARTED:
      return state.typedMerge({ text: action.payload.item.text });

    default:
      return state;
  }
};

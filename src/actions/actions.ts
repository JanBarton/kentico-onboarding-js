import { AnyAction } from 'redux';
import { ItemDelete, ToggleDirection } from '../constants/actionTypes';

export function toggleItemsDirection(): AnyAction {
  return {
    type: ToggleDirection
  };
}
export function onClickItemDelete(itemId: string): AnyAction {
  return {
    type: ItemDelete,
    payload: {
      itemId,
    }
  };
}


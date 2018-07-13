import { AnyAction } from 'redux';
import { ItemCancel, ItemDelete, ItemSave, ItemClick, AddNewItem, ToggleDirection } from '../constants/actionTypes';
import * as uuidv4 from 'uuid/v4';

export function toggleItemsDirection(): AnyAction {
  return {
    type: ToggleDirection
  };
}

export function onItemClick(itemId: string): AnyAction {
  return {
    type: ItemClick,
    payload: {
      itemId,
    }
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

export function onClickItemCancel(itemId: string): AnyAction {
  return {
    type: ItemCancel,
    payload: {
      itemId,
    }
  };
}

export function onClickItemSave(itemId: string, text: string): AnyAction {
  return {
    type: ItemSave,
    payload: {
      itemId,
      text,
    }
  };
}

export function onAddNewItem(text: string): AnyAction {
  return {
    type: AddNewItem,
    payload: {
      id: uuidv4(),
      text
    }
  };
}


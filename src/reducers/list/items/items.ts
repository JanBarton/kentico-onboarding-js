import { OrderedMap } from 'immutable';
import { ListItem } from '../../../models/classes/ListItem';
import * as ActionTypes from '../../../constants/actionTypes';
import { IItemsState } from '../../../models/interfaces/IItemsState';
import { IAction } from '../../../models/interfaces/IAction';
import { Guid } from '../../../models/Guid';
import { listItemsArrayToOrderedMap } from '../../../utils/listItemsArrayToOrderedMap';

const addNewItem = (state: IItemsState, action: IAction): IItemsState => {
  const { itemId: id, text } = action.payload;

  const newItem = new ListItem({
    id,
    text,
  });

  return state.set(id, newItem);
};

const deleteItem = (state: IItemsState, action: IAction): IItemsState => {
  const { itemId } = action.payload;

  return state.delete(itemId);
};

const saveItemChanges = (state: IItemsState, action: IAction): IItemsState => {
  const { itemId, newText } = action.payload;

  return state.update(itemId, item =>
    item.with({
      text: newText,
      isBeingEdited: false,
    }));
};

const openItemForEditing = (state: IItemsState, action: IAction): IItemsState => {
  const { itemId } = action.payload;

  return state.update(itemId, item =>
    item.with({
      isBeingEdited: true,
    }));
};

const cancelItemChanges = (state: IItemsState, action: IAction): IItemsState => {
  const { itemId } = action.payload;

  return state.update(itemId, item =>
    item.with({
      isBeingEdited: false,
    }));
};

const fetchItems = (action: IAction): IItemsState =>
  listItemsArrayToOrderedMap(action.payload.items);

const initialState = OrderedMap<Guid, ListItem>();

export const items = (state = initialState, action: IAction): IItemsState => {
  const { type } = action;

  switch (type) {
    case ActionTypes.ITEM_CREATED:
      return addNewItem(state, action);
    case ActionTypes.ITEM_DELETED:
      return deleteItem(state, action);
    case ActionTypes.ITEM_CHANGES_SAVED:
      return saveItemChanges(state, action);
    case ActionTypes.ITEM_OPENED_FOR_EDITING:
      return openItemForEditing(state, action);
    case ActionTypes.ITEM_CHANGES_CANCELED:
      return cancelItemChanges(state, action);
    case ActionTypes.FETCH_ITEMS_SUCCESS:
      return fetchItems(action);
    default:
      return state;
  }
};

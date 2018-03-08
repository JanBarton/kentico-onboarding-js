import {
  ITEM_ADD,
  ITEM_DELETE,
  ITEM_EDITING,
} from '../utils/constants';

export const addItem = (newItemKey, newItemValue) => ({
  type: ITEM_ADD,
  item: {
    key: newItemKey,
    value: newItemValue,
  },
});

export const deleteItem = (item) => ({
  type: ITEM_DELETE,
  item,
});

export const toggleItemEditing = (item) => ({
  type: ITEM_EDITING,
  item,
});

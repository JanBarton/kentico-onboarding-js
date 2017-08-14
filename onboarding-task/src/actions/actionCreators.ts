import * as uuidV4 from 'uuid';

import { IAction } from '../interfaces/IAction';
import {
  ITEM_CHANGE_CANCELLED,
  ITEM_CHANGE_SAVED,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_MAKE_EDITABLE,
} from './actionTypes';

export const createItemFactory = (idGenerator: () => string): (text: string) => IAction => (
  (text: string) => ({
    type: ITEM_CREATED,
    payload: {
      text,
      newId: idGenerator(),
    },
  })
);
const createItemWithUuidV4 = createItemFactory(uuidV4);

export { createItemWithUuidV4 as createItem };

export const deleteItem = (id: string): IAction => ({
  type: ITEM_DELETED,
  payload: {id},
});

export const cancelChange = (id: string): IAction => ({
  type: ITEM_CHANGE_CANCELLED,
  payload: {id},
});

export const saveChange = (id: string, text: string): IAction => ({
  type: ITEM_CHANGE_SAVED,
  payload: {
    id,
    text,
  },
});

export const makeEditable = (id: string): IAction => ({
  type: ITEM_MAKE_EDITABLE,
  payload: {id},
});

import * as uuidV4 from 'uuid';
import * as fetch from 'isomorphic-fetch';

import { ThunkAction } from '../interfaces/IAction';
import { ItemData } from '../models/ItemData';
import { deleteItemThunkFactory } from './thunkFactories/deleteItemThunkFactory';
import { fetchItemsThunkFactory } from './thunkFactories/fetchItemsThunkFactory';
import { createItemThunkFactory } from './thunkFactories/createItemThunkFactory';
import { updateItemThunkFactory } from './thunkFactories/updateItemThunkFactory';
import { fetchJsonResponse } from '../utils/fetchJsonResponse';

export { cancelChange, makeEditable } from './actionCreators';

const makeRequest = fetchJsonResponse({fetch});

export const deleteItem: (id: string) => ThunkAction = deleteItemThunkFactory({
  fetchJsonResponse: makeRequest,
  deleteThunkActionFactory: deleteItemThunkFactory,
});

export const fetchItems: () => ThunkAction = fetchItemsThunkFactory({
  fetchJsonResponse: makeRequest,
  getThunkActionFactory: fetchItemsThunkFactory,
});

export const createItem: (text: string) => ThunkAction = createItemThunkFactory({
  fetchJsonResponse: makeRequest,
  optimisticUpdatedGenerator: uuidV4,
  postThunkActionFactory: createItemThunkFactory
});

export const updateItem: (item: ItemData) => ThunkAction = updateItemThunkFactory({
  fetchJsonResponse: makeRequest,
  putThunkActionFactory: updateItemThunkFactory,
});

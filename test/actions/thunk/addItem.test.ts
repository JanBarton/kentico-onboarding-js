import { IListItem } from '../../../src/models/interfaces/IListItem';
import { ListItem } from '../../../src/models/classes/ListItem';
import { addItemFactory } from '../../../src/actions/thunk/addItemFactory';
import {
  fakeFunction,
  getDispatchedActionTypes,
  httpClientFailure,
  httpClientSuccessFactory,
} from './thunkTestsUtils';
import {
  ITEM_ADD_SUCCESS,
  ITEM_ADD_START,
  ITEM_SYNC_FAILED,
} from '../../../src/constants/actionTypes';

const actionParams = { text: '' };
const uri = '';

describe('addItem', () => {
  describe('successful request will dispatch', () => {
    it('requestItemAddition and confirmItemAddition actions', () => {
      const expectedActionTypes = [
        ITEM_ADD_START,
        ITEM_ADD_SUCCESS,
      ];
      const createdItem: IListItem = new ListItem();
      const httpClient = httpClientSuccessFactory(createdItem);
      const postItem = addItemFactory({
        uri,
        httpClient,
        createNewId: fakeFunction,
      });
      const dispatch = jest.fn();

      return postItem(actionParams)(dispatch)
        .then(() => {
          const callArguments = getDispatchedActionTypes(dispatch);

          expect(callArguments)
            .toEqual(expectedActionTypes);
        });
    });
  });

  describe('failed request will dispatch', () => {
    it('addNewItem and addNewItemFailed actions', () => {
      const expectedActionTypes = [
        ITEM_ADD_START,
        ITEM_SYNC_FAILED,
      ];
      const httpClient = httpClientFailure;
      const postItem = addItemFactory({
        uri,
        httpClient,
        createNewId: fakeFunction,
      });
      const dispatch = jest.fn();

      return postItem(actionParams)(dispatch)
        .then(() => {
          const callArguments = getDispatchedActionTypes(dispatch);

          expect(callArguments)
            .toEqual(expectedActionTypes);
        });
    });
  });
});

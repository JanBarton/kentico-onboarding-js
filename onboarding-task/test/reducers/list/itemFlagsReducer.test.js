import { itemFlagsReducer } from '../../../src/reducers/list/itemFlagsReducer.ts';
import { ItemFlags } from '../../../src/models/ItemFlags.ts';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  ITEM_CHANGE_CANCELLED,
  ITEM_MAKE_EDITABLE,
  CREATE_REQUEST_FAIL,
  UPDATE_REQUEST_FAIL,
  UPDATE_REQUEST_STARTED,
  UPDATE_REQUEST_SUCCESS,
} from '../../../src/actions/actionTypes.ts';
import {
  cancelChange,
  makeEditable,
  deleteItemStarted,
  updateItemStarted,
  deleteItemFailed,
  updateItemFailed,
  createItemFailed,
  updateItemSucceeded,
} from '../../../src/actions/actionCreators.ts';
import { ItemData } from '../../../src/models/ItemData.ts';
import { RequestError } from '../../../src/models/RequestError.ts';

describe('ItemFlags reducer with', () => {
  const mockId = '42';
  const mockText = 'Yay';

  describe(`"${ITEM_MAKE_EDITABLE}" action`, () => {
    it('makes ItemFlags edited correctly', () => {
      const prevState = new ItemFlags();
      const expectedState = new ItemFlags({
        isBeingEdited: true,
      });
      const action = makeEditable('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change already edited ItemFlags', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const action = makeEditable('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });

  describe(`"${ITEM_CHANGE_CANCELLED}" action`, () => {
    it('does not change ItemFlags that is not being edited', () => {
      const prevState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = cancelChange('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });

    it('makes edited ItemFlags not editable anymore', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
      });
      const action = cancelChange('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${DELETE_REQUEST_STARTED}" action`, () => {
    it('sets item flags correctly on item', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
        isStored: true,
        requestError: null,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
        isStored: false,
        requestError: null,
      });
      const action = deleteItemStarted('42');

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${DELETE_REQUEST_FAIL}" action`, () => {
    it('stores the error', () => {
      const error = new Error('Error while deleting!', '42');
      const mockDeleteThunk = (_) => Promise.resolve({
        type: DELETE_REQUEST_STARTED,
        payload: {
          targetItemId: '42',
        },
      });
      const action = deleteItemFailed('42', error.message, mockDeleteThunk);
      const prevState = new ItemFlags({
        isBeingEdited: false,
        isStored: true,
        requestError: null,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
        isStored: true,
        requestError: new RequestError({
          targetItemId: action.payload.id,
          retryAction: action.payload.retryAction,
          errorMessage: action.payload.errorMessage,
        }),
      });

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${UPDATE_REQUEST_STARTED}" action`, () => {
    it('sets item flags correctly on item', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
        isStored: true,
        requestError: null,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
        isStored: false,
        requestError: null,
      });
      const putItem = new ItemData({
        id: '42',
        text: 'Mlock',
      });

      const action = updateItemStarted(putItem);

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${UPDATE_REQUEST_FAIL}" action`, () => {
    it('stores the error', () => {
      const error = new Error('Error while putting!', '42');
      const mockPutThunk = (_) => Promise.resolve({
        type: UPDATE_REQUEST_STARTED,
        payload: {
          targetItemId: '42',
        },
      });
      const action = updateItemFailed('42', error.message, mockPutThunk);
      const prevState = new ItemFlags({
        isBeingEdited: false,
        isStored: true,
        requestError: null,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
        isStored: true,
        requestError: new RequestError({
          targetItemId: action.payload.id,
          retryAction: action.payload.retryAction,
          errorMessage: action.payload.errorMessage,
        }),
      });

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${CREATE_REQUEST_FAIL}" action`, () => {
    it('stores the error', () => {
      const error = new Error('Error while posting!', mockId);
      const mockPostThunk = (_) => Promise.resolve({
        payload: {
          text: mockText,
          optimisticId: mockId,
        },
      });
      const action = createItemFailed(mockId, error.message, mockPostThunk);
      const prevState = new ItemFlags({
        isBeingEdited: false,
        isStored: false,
        requestError: null,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
        isStored: false,
        requestError: new RequestError({
          targetItemId: action.payload.id,
          retryAction: action.payload.retryAction,
          errorMessage: action.payload.errorMessage,
        }),
      });

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${UPDATE_REQUEST_SUCCESS}" action`, () => {
    it('makes edited ItemFlags stored and not editable anymore', () => {
      const mockJsonResponseItem = {
        id: mockId,
        text: mockText,
      };
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });
      const expectedState = new ItemFlags({
        isBeingEdited: false,
        isStored: true,
      });
      const action = updateItemSucceeded(mockJsonResponseItem);

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });


  describe('unknown action type', () => {
    const action = { type: 'unknownType' };

    it('returns default state on undefined', () => {
      const expectedState = new ItemFlags();

      const createdState = itemFlagsReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const prevState = new ItemFlags({
        isBeingEdited: true,
      });

      const createdState = itemFlagsReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });
});

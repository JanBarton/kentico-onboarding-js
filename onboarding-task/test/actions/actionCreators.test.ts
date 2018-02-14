import {
  FETCH_REQUEST_STARTED, FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAIL,
  ITEM_MAKE_EDITABLE, ITEM_CHANGE_CANCELLED,
  UPDATE_REQUEST_STARTED, UPDATE_REQUEST_SUCCESS, UPDATE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED, DELETE_REQUEST_SUCCESS, DELETE_REQUEST_FAIL,
  CREATE_REQUEST_STARTED, CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAIL,
} from '../../src/actions/actionTypes';
import {
  cancelChange, makeEditable,
  deleteItemFailed, deleteItemStarted, deleteItemSucceeded,
  fetchItemsFailed, fetchItemsSucceeded, fetchItemsStarted,
  createItemFailed, createItemStarted, createItemSucceeded,
  updateItemFailed, updateItemStarted, updateItemSucceeded,
} from '../../src/actions/actionCreators';
import { ItemData } from '../../src/models/ItemData';
import { IAction, ThunkAction } from '../../src/interfaces/IAction';

describe('Action creators', () => {
  const error = new Error('500: Internal server error');
  const mockRetryThunk: ThunkAction = () => Promise.reject(error);

  it(`creates "${ITEM_CHANGE_CANCELLED}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_CHANGE_CANCELLED,
      payload: {
        id: '17',
      },
    };

    const createdAction = cancelChange('17');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${ITEM_MAKE_EDITABLE}" action correctly`, () => {
    const expectedAction = {
      type: ITEM_MAKE_EDITABLE,
      payload: {
        id: '17',
      },
    };

    const createdAction = makeEditable('17');

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${FETCH_REQUEST_STARTED}" action correctly`, () => {
    const expectedAction = {
      type: FETCH_REQUEST_STARTED,
    };

    const createdAction = fetchItemsStarted();

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${FETCH_REQUEST_SUCCESS}" action correctly`, () => {
    const fetchResultJSON = [
      {
        id: 'caf18adc-519f-46e6-a03b-f0106165bad1',
        text: 'Mlok',
      }
    ];
    const expectedAction = {
      type: FETCH_REQUEST_SUCCESS,
      payload: {
        items: fetchResultJSON,
      }
    };

    const createdAction = fetchItemsSucceeded(fetchResultJSON);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${FETCH_REQUEST_FAIL}" action correctly`, () => {
    const expectedAction: IAction = {
      type: FETCH_REQUEST_FAIL,
      payload: {
        errorMessage: error.message,
        retryAction: mockRetryThunk
      }
    };

    const createdAction = fetchItemsFailed(error.message, mockRetryThunk);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${UPDATE_REQUEST_STARTED}" action correctly`, () => {
    const item: ItemData = new ItemData({
      id: 'caf18adc-519f-46e6-a03b-f0106165bad1',
      text: 'Mlok',
    });
    const expectedAction = {
      type: UPDATE_REQUEST_STARTED,
      payload: {
        id: item.id,
        item,
      }
    };

    const createdAction = updateItemStarted(item);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${UPDATE_REQUEST_SUCCESS}" action correctly`, () => {
    const JSONItem = {
      id: 'caf18adc-519f-46e6-a03b-f0106165bad1',
      text: 'Mlok',
    };
    const expectedAction = {
      type: UPDATE_REQUEST_SUCCESS,
      payload: {
        id: JSONItem.id,
        item: JSONItem,
      },
    };

    const createdAction = updateItemSucceeded(JSONItem);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${UPDATE_REQUEST_FAIL}" action correctly`, () => {
    const putId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction: IAction = {
      type: UPDATE_REQUEST_FAIL,
      payload: {
        id: putId,
        errorMessage: error.message,
        retryAction: mockRetryThunk
      }
    };

    const createdAction = updateItemFailed(putId, error.message, mockRetryThunk);

    expect(createdAction).toEqual(expectedAction);

  });

  it(`creates "${DELETE_REQUEST_STARTED}" action correctly`, () => {
    const deleteId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction = {
      type: DELETE_REQUEST_STARTED,
      payload: {
        id: deleteId,
      },
    };

    const createdAction = deleteItemStarted(deleteId);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${DELETE_REQUEST_SUCCESS}" action correctly`, () => {
    const deleteId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction = {
      type: DELETE_REQUEST_SUCCESS,
      payload: {
        id: deleteId,
      },
    };

    const createdAction = deleteItemSucceeded(deleteId);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${DELETE_REQUEST_FAIL}" action correctly`, () => {
    const deleteId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction: IAction = {
      type: DELETE_REQUEST_FAIL,
      payload: {
        id: deleteId,
        errorMessage: error.message,
        retryAction: mockRetryThunk
      }
    };

    const createdAction = deleteItemFailed(deleteId, error.message, mockRetryThunk);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${CREATE_REQUEST_STARTED}" action correctly`, () => {
    const postOptimisticId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const textToPost = 'Mlok';
    const expectedAction = {
      type: CREATE_REQUEST_STARTED,
      payload: {
        text: textToPost,
        optimisticId: postOptimisticId,
      },
    };

    const createdAction = createItemStarted(postOptimisticId, textToPost);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${CREATE_REQUEST_SUCCESS}" action correctly`, () => {
    const formerId = '00000000-aaaa-aaaa-aaaa-000000000000';
    const JSONItem = {
      id: 'caf18adc-519f-46e6-a03b-f0106165bad1',
      text: 'Mlok',
    };

    const expectedAction = {
      type: CREATE_REQUEST_SUCCESS,
      payload: {
        formerId,
        item: JSONItem,
      },
    };

    const createdAction = createItemSucceeded(formerId, JSONItem);

    expect(createdAction).toEqual(expectedAction);
  });

  it(`creates "${CREATE_REQUEST_FAIL}" action correctly`, () => {
    const putId = 'caf18adc-519f-46e6-a03b-f0106165bad1';
    const expectedAction: IAction = {
      type: CREATE_REQUEST_FAIL,
      payload: {
        id: putId,
        errorMessage: error.message,
        retryAction: mockRetryThunk
      }
    };

    const createdAction = createItemFailed(putId, error.message, mockRetryThunk);

    expect(createdAction).toEqual(expectedAction);
  });
});

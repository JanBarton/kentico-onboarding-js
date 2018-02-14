import {
  deleteItemThunkFactory,
} from '../../../src/actions/thunkFactories/deleteItemThunkFactory';
import {
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_STARTED,
  DELETE_REQUEST_SUCCESS
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Delete thunk factory', () => {
  const mockId = '17';

  const mockDeleteThunk: ThunkAction = (_: never) => Promise.resolve({
    type: DELETE_REQUEST_STARTED,
    payload: {
      id: mockId,
    },
  });

  it(`dispatches "${DELETE_REQUEST_STARTED}" and "${DELETE_REQUEST_SUCCESS}" actions with given id and OK response`, async () => {
    const expectedActions = [
      {
        type: DELETE_REQUEST_STARTED,
        payload: {
          id: mockId,
        },
      },
      {
        type: DELETE_REQUEST_SUCCESS,
        payload: {
          id: mockId,
        },
      },
    ];
    const deleteStoredItemThunk = deleteItemThunkFactory({
      fetchJsonResponse: () => Promise.resolve(),
      deleteThunkActionFactory: deleteItemThunkFactory,
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await deleteStoredItemThunk(mockId)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });

  it(`dispatches "${DELETE_REQUEST_STARTED}" and "${DELETE_REQUEST_FAIL}" action with given id and NOK response`, async () => {
    const mockErrorObject = {status: '404', statusText: 'Forbidden'};
    const expectedActions = [
      {
        type: DELETE_REQUEST_STARTED,
        payload: {
          id: mockId,
        },
      },
      {
        type: DELETE_REQUEST_FAIL,
        payload: {
          retryAction: mockDeleteThunk,
          errorMessage: `${mockErrorObject.status}: ${mockErrorObject.statusText}`,
          id: mockId,
        },
      },
    ];
    const deleteItemThunk = deleteItemThunkFactory({
      fetchJsonResponse: () => { throw new Error(`${mockErrorObject.status}: ${mockErrorObject.statusText}`); },
      deleteThunkActionFactory: jest.fn(() => () => mockDeleteThunk),
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await deleteItemThunk(mockId)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });
});


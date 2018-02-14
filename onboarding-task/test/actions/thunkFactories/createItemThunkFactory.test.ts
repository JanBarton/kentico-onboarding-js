import {
  createItemThunkFactory,
} from '../../../src/actions/thunkFactories/createItemThunkFactory';
import {
  CREATE_REQUEST_STARTED,
  CREATE_REQUEST_FAIL,
  CREATE_REQUEST_SUCCESS
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Post thunk factory', () => {
  const mockNewText = 'Blop';
  const mockOptimisticId = '17';
  const mockBackendId = '71';

  const mockPostThunk: ThunkAction = (_: never) => Promise.resolve({
    type: CREATE_REQUEST_STARTED, payload: {
      text: mockNewText,
      optimisticId: mockOptimisticId,
    }
  });
  const mockPostThunkFactory = (_: never) =>
    (___: never) => mockPostThunk;


  it(`dispatches "${CREATE_REQUEST_STARTED}" and "${CREATE_REQUEST_SUCCESS}" action with given text and OK response`, async () => {
    const expectedActions = [
      {
        type: CREATE_REQUEST_STARTED,
        payload: {
          optimisticId: mockOptimisticId,
          text: mockNewText,
        },
      },
      {
        type: CREATE_REQUEST_SUCCESS,
        payload: {
          formerId: mockOptimisticId,
          item: {
            id: mockBackendId,
            text: mockNewText,
          },
        },
      },
    ];
    const postItemThunk = createItemThunkFactory({
      fetchJsonResponse: () => Promise.resolve({id: mockBackendId, text: mockNewText}),
      optimisticUpdatedGenerator: jest.fn(() => mockOptimisticId),
      postThunkActionFactory: createItemThunkFactory
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await postItemThunk(mockNewText)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });

  it(`dispatches "${CREATE_REQUEST_STARTED}" and "${CREATE_REQUEST_FAIL}" action with given text and NOK response`, async () => {
    const mockErrorObject = {status: '404', statusText: 'Forbidden'};
    const expectedActions = [
      {
        type: CREATE_REQUEST_STARTED,
        payload: {
          optimisticId: mockOptimisticId,
          text: mockNewText,
        },
      },
      {
        type: CREATE_REQUEST_FAIL,
        payload: {
          retryAction: mockPostThunk,
          errorMessage: `${mockErrorObject.status}: ${mockErrorObject.statusText}`,
          id: mockOptimisticId,
        }
      },
    ];
    const postItemThunk = createItemThunkFactory({
      fetchJsonResponse: () => { throw new Error(`${mockErrorObject.status}: ${mockErrorObject.statusText}`); },
      optimisticUpdatedGenerator: jest.fn(() => mockOptimisticId),
      postThunkActionFactory: mockPostThunkFactory
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await postItemThunk(mockNewText)(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });
});


import {
  fetchItemsThunkFactory,
} from '../../../src/actions/thunkFactories/fetchItemsThunkFactory';
import {
  FETCH_REQUEST_STARTED,
  FETCH_REQUEST_FAIL,
  FETCH_REQUEST_SUCCESS,
} from '../../../src/actions/actionTypes';
import { ThunkAction } from '../../../src/interfaces/IAction';

describe('Get thunk factory', () => {
  const mockItems = [
    {id: '17', text: 'Popcorn bucket'},
    {id: '71', text: 'Not-so-much-popcorn bucket'}
  ];

  const mockGetThunk: ThunkAction = () => Promise.resolve({
    type: FETCH_REQUEST_STARTED,
  });

  it(`dispatches "${FETCH_REQUEST_STARTED}","${FETCH_REQUEST_SUCCESS} and the parseThunk actions with OK response`, async () => {
    const expectedActions = [
      {
        type: FETCH_REQUEST_STARTED,
      },
      {
        type: FETCH_REQUEST_SUCCESS,
        payload: {
          items: mockItems,
        },
      },
    ];
    const getItemsThunk = fetchItemsThunkFactory({
      fetchJsonResponse: () => Promise.resolve(mockItems),
      getThunkActionFactory: fetchItemsThunkFactory,
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await getItemsThunk()(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });

  it(`dispatches "${FETCH_REQUEST_STARTED}" and "${FETCH_REQUEST_FAIL}" action with NOK response`, async () => {
    const mockErrorObject = {status: '404', statusText: 'Forbidden'};
    const expectedActions = [
      {
        type: FETCH_REQUEST_STARTED,
      },
      {
        type: FETCH_REQUEST_FAIL,
        payload: {
          retryAction: mockGetThunk,
          errorMessage: `${mockErrorObject.status}: ${mockErrorObject.statusText}`,
        },
      },
    ];
    const getSavedItemThunk = fetchItemsThunkFactory({
      fetchJsonResponse: () => { throw new Error(`${mockErrorObject.status}: ${mockErrorObject.statusText}`); },
      getThunkActionFactory: jest.fn(() => () => mockGetThunk),
    });
    const dispatch = jest.fn();
    const getState = jest.fn();

    await getSavedItemThunk()(dispatch, getState, {});

    expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
    expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
  });
});


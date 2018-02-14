import { errorReducer } from '../../../src/reducers/status/errorReducer'
import {
  CREATE_REQUEST_FAIL,
  DELETE_REQUEST_FAIL,
  FETCH_REQUEST_FAIL,
  UPDATE_REQUEST_FAIL
} from '../../../src/actions/actionTypes';
import {
  createItemFailed,
  deleteItemFailed, fetchItemsFailed,
  updateItemFailed
} from '../../../src/actions/actionCreators';
import { ThunkAction } from '../../../src/interfaces/IAction';
import { RequestError } from '../../../src/models/RequestError';

describe('Error reducer', () => {
  describe(`"${UPDATE_REQUEST_FAIL}" action`, () => {
    it('saves the error to state', () => {
      const mockRetryAction: ThunkAction = jest.fn();
      const mockErrorMessage: string = 'ErrorMessage';
      const mockItemId: string = '1';
      const action = updateItemFailed(mockItemId, mockErrorMessage, mockRetryAction);
      const prevState = null;
      const expectedState = new RequestError({
        targetItemId: mockItemId,
        errorMessage: mockErrorMessage,
        retryAction: mockRetryAction
      });

      const createdState = errorReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${CREATE_REQUEST_FAIL}" action`, () => {
    it('saves the error to state', () => {
      const mockRetryAction: ThunkAction = jest.fn();
      const mockErrorMessage: string = 'ErrorMessage';
      const mockItemId: string = '1';
      const action = createItemFailed(mockItemId, mockErrorMessage, mockRetryAction);
      const prevState = null;
      const expectedState = new RequestError({
        targetItemId: mockItemId,
        errorMessage: mockErrorMessage,
        retryAction: mockRetryAction
      });


      const createdState = errorReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${DELETE_REQUEST_FAIL}" action`, () => {
    it('saves the error to state', () => {
      const mockRetryAction: ThunkAction = jest.fn();
      const mockErrorMessage: string = 'ErrorMessage';
      const mockItemId: string = '1';
      const action = deleteItemFailed(mockItemId, mockErrorMessage, mockRetryAction);
      const prevState = null;
      const expectedState = new RequestError({
        targetItemId: mockItemId,
        errorMessage: mockErrorMessage,
        retryAction: mockRetryAction
      });


      const createdState = errorReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${FETCH_REQUEST_FAIL}" action`, () => {
    it('saves the error to state', () => {
      const mockRetryAction: ThunkAction = jest.fn();
      const mockErrorMessage: string = 'ErrorMessage';
      const action = fetchItemsFailed(mockErrorMessage, mockRetryAction);
      const prevState = null;
      const expectedState = new RequestError({
        errorMessage: mockErrorMessage,
        retryAction: mockRetryAction
      });


      const createdState = errorReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknown' };

    it('returns default state on undefined', () => {
      const expectedState = null;

      const createdState = errorReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const prevState = new RequestError();

      const createdState = errorReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });
});

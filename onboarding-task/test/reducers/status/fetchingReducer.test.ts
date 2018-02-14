import {
  FETCH_REQUEST_FAIL,
  FETCH_REQUEST_STARTED,
  FETCH_REQUEST_SUCCESS,
} from '../../../src/actions/actionTypes';
import {
  fetchItemsFailed, fetchItemsStarted,
  fetchItemsSucceeded
} from '../../../src/actions/actionCreators';
import { ThunkAction } from '../../../src/interfaces/IAction';
import { isFetchingReducer } from '../../../src/reducers/status/fetchingReducer';
import { IItemDTO } from '../../../src/interfaces/IItemDTO';

describe('Error reducer', () => {
  describe(`"${FETCH_REQUEST_STARTED}" action`, () => {
    it('saves the error to state', () => {
      const action = fetchItemsStarted();
      const prevState = false;
      const expectedState = true;

      const createdState = isFetchingReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${FETCH_REQUEST_SUCCESS}" action`, () => {
    it('sets the state to false', () => {
      const mockFetchedItems: IItemDTO[] = [];
      const action = fetchItemsSucceeded(mockFetchedItems);
      const prevState = true;
      const expectedState = false;

      const createdState = isFetchingReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe(`"${FETCH_REQUEST_FAIL}" action`, () => {
    it('sets the state to false', () => {
      const mockRetryAction: ThunkAction = jest.fn();
      const mockErrorMessage: string = 'ErrorMessage';
      const action = fetchItemsFailed(mockErrorMessage, mockRetryAction);
      const prevState = true;
      const expectedState = false;

      const createdState = isFetchingReducer(prevState, action);

      expect(createdState).toEqual(expectedState);
    });
  });

  describe('unknown action type', () => {
    const action = { type: 'unknown' };

    it('returns default state on undefined', () => {
      const expectedState = false;

      const createdState = isFetchingReducer(undefined, action);

      expect(createdState).toEqual(expectedState);
    });

    it('does not change state', () => {
      const prevState = true;

      const createdState = isFetchingReducer(prevState, action);

      expect(createdState).toBe(prevState);
    });
  });
});

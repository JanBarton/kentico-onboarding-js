import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/internalActionCreators/baseActionCreators';
import { errorReducer } from '../../../src/reducers/nodesListReducers/errorReducer';
import {
  ADD_NODE_FAILURE,
  GET_NODES_FAILURE,
  UPDATE_NODE_FAILURE,
  DELETE_NODE_FAILURE
} from '../../../src/constants/actionTypes';

describe('errorReducer', () => {
  const emptyState = OrderedMap<Guid, string>();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const text = 'error text';
  const nonEmptyState = emptyState.set(id, text);
  const failureActionTypes = [
    ADD_NODE_FAILURE,
    GET_NODES_FAILURE,
    UPDATE_NODE_FAILURE,
    DELETE_NODE_FAILURE
  ];

  it('returns initial state', () => {
    const initialState = undefined;
    const action = {type: 'UNKNOWN'};

    const actualState = errorReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('DISMISS_ERROR', () => {
    it('deletes an error statement correctly', () => {
      const action = actions.dismissError(id);

      const actualState = errorReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting non-existent node correctly', () => {
      const anotherId = '05012399-087d-4944-a742-7cf698e01b85';
      const action = actions.dismissError(anotherId);

      const actualState = errorReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  const testFailure = (type: string) => {
    it('handles adding a new error call after a failure: ' + type, () => {
      const action = ({
        type,
        payload: {
          id,
          text
        }
      });

      const actualState = errorReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  };

  failureActionTypes.forEach(testFailure);
});

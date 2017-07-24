import { List } from 'immutable';

import * as actions from '../../../src/actions/actionCreators';
import { nodesIdsReducer } from '../../../src/reducers/listReducers/nodesIdsReducer';
import { addNodeFactory } from '../../../src/actions/addNodeFactory';

describe('nodesIdsReducer', () => {
  const emptyState = List();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const addNode = addNodeFactory(() => id);
  const nonEmptyState = emptyState.push(id);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = nodesIdsReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('ADD_NODE', () => {
    it('handles adding a node', () => {
      const action = addNode('text');

      const actualState = nodesIdsReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('DELETE_NODE', () => {
    it('handles deleting a node', () => {
      const action = actions.deleteNode(id);

      const actualState = nodesIdsReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node', () => {
      const action = actions.deleteNode(id);

      const actualState = nodesIdsReducer(emptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node from non empty state', () => {
      const action = actions.deleteNode('80185242-d624-b669-5d3c-37c11523ba85');

      const actualState = nodesIdsReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });
});

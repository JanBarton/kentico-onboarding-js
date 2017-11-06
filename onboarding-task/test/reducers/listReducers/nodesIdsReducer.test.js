import { List } from 'immutable';

import * as actions from '../../../src/actions/internalActionCreators/baseActionCreators.ts';
import { nodesIdsReducer } from '../../../src/reducers/nodesListReducers/nodesIdsReducer.ts';

describe('nodesIdsReducer', () => {
  const emptyState = List();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const anotherId = '05012399-087d-4944-a742-7cf698e01b85';
  const nonEmptyState = emptyState.push(id);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = nodesIdsReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('ADD_NODE_OPTIMISTIC', () => {
    it('handles adding a node', () => {
      const action = actions.addNodeOptimistically({
        id,
        text: 'text',
      });

      const actualState = nodesIdsReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('ADD_NODE_SUCCESS', () => {
    it('handles adding a node', () => {
      const action = actions.addNodeSuccess(anotherId, {
        id,
        text: 'some text',
      });

      const actualState = nodesIdsReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });

    it('successfully replaces a non persistent node', () => {
      const action = actions.addNodeSuccess(id, {
        id: anotherId,
        text: 'some text',
      });
      const expectedState = emptyState.push(anotherId);

      const actualState = nodesIdsReducer(nonEmptyState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('GET_NODES_SUCCESS', () => {
    it('handles fetching multiple nodes at once', () => {
      const firstNode = { id };
      const secondNode = { id: anotherId };
      const action = actions.getNodesSuccess([firstNode, secondNode]);
      const expectedState = nonEmptyState.push(anotherId);

      const actualState = nodesIdsReducer(emptyState, action);

      expect(expectedState).toEqual(actualState);
    });

    it('handles fetching 0 nodes', () => {
      const action = actions.getNodesSuccess([]);

      const actualState = nodesIdsReducer(emptyState, action);

      expect(emptyState).toEqual(actualState);
    });
  });

  describe('DELETE_NODE_SUCCESS', () => {
    it('handles deleting a node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = nodesIdsReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = nodesIdsReducer(emptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node from non empty state', () => {
      const action = actions.deleteNodeSuccess('80185242-d624-b669-5d3c-37c11523ba85');

      const actualState = nodesIdsReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });
});

import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/internalActionCreators/baseActionCreators';
import { persistedNodesReducer } from '../../../src/reducers/nodesListReducers/persistedNodesReducer';

describe('persistedNodesReducer', () => {
  const emptyState = OrderedMap<Guid, boolean>();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const anotherId = '05012399-087d-4944-a742-7cf698e01b85';
  const nonEmptyState = emptyState.set(id, false);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = persistedNodesReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('ADD_NODE_OPTIMISTIC', () => {
    it('handles adding a node', () => {
      const action = actions.addNodeOptimistically({
        id,
        text: 'text',
      });
      const expectedState = emptyState.set(id, false);

      const actualState = persistedNodesReducer(emptyState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('ADD_NODE_SUCCESS', () => {
    it('handles adding a node', () => {
      const nodeDataToPost = {
        id,
        text: 'some text',
      };
      const action = actions.addNodeSuccess(anotherId, nodeDataToPost);
      const expectedState = emptyState.set(id, true);

      const actualState = persistedNodesReducer(emptyState, action);

      expect(actualState).toEqual(expectedState);
    });

    it('successfully replaces a non persistent node', () => {
      const nodeDataToPost = {
        id: anotherId,
        text: 'some text',
      };
      const action = actions.addNodeSuccess(id, nodeDataToPost);
      const expectedState = emptyState.set(anotherId, true);

      const actualState = persistedNodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('GET_NODES_SUCCESS', () => {
    it('handles fetching multiple nodes at once', () => {
      const action = actions.getNodesSuccess([{ id, text: ' ' }, { id: anotherId, text: 'aaa' }]);
      const stateWithNode = emptyState.set(id, true);
      const expectedState = stateWithNode.set(anotherId, true);

      const actualState = persistedNodesReducer(emptyState, action);

      expect(expectedState).toEqual(actualState);
    });

    it('handles fetching 0 nodes', () => {
      const action = actions.getNodesSuccess([]);

      const actualState = persistedNodesReducer(emptyState, action);

      expect(emptyState).toEqual(actualState);
    });
  });

  describe('DELETE_NODE_SUCCESS', () => {
    it('handles deleting a node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = persistedNodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = persistedNodesReducer(emptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node from non empty state', () => {
      const action = actions.deleteNodeSuccess('80185242-d624-b669-5d3c-37c11523ba85');

      const actualState = persistedNodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });
});

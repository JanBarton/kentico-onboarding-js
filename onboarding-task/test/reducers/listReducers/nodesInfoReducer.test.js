import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/actionCreators.ts';
import { NodeInfo } from '../../../src/models/NodeInfo.ts';
import { nodesInfoReducer } from '../../../src/reducers/nodesListReducers/nodesInfoReducer.ts';

describe('nodesInfoReducer', () => {
  const emptyState = OrderedMap();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const anotherId = '05012399-087d-4944-a742-7cf698e01b85';
  const defaultNode = new NodeInfo();
  const toggledNode = new NodeInfo({
    isBeingEdited: true,
  });
  const nonEmptyState = emptyState.set(id, defaultNode);
  const stateWithToggledNode = emptyState.set(id, toggledNode);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = nodesInfoReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('POST_NODE_SUCCESS', () => {
    it('handles adding a node', () => {
      const action = actions.postNodeSuccess({
        id,
        text: 'text',
      });

      const actualState = nodesInfoReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('FETCH_NODES_SUCCESS', () => {
    it('handles fetching multiple nodes at once', () => {
      const action = actions.fetchNodesSuccess([{ id }, { id: anotherId }]);
      const expectedState = nonEmptyState.set(anotherId, defaultNode);

      const actualState = nodesInfoReducer(emptyState, action);

      expect(expectedState).toEqual(actualState);
    });

    it('handles fetching 0 nodes', () => {
      const action = actions.fetchNodesSuccess([]);

      const actualState = nodesInfoReducer(emptyState, action);

      expect(emptyState).toEqual(actualState);
    });
  });

  describe('DELETE_NODE_SUCCESS', () => {
    it('handles deleting a node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = nodesInfoReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = nodesInfoReducer(emptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node from non empty state', () => {
      const action = actions.deleteNodeSuccess('80185242-d624-b669-5d3c-37c11523ba85');

      const actualState = nodesInfoReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('TOGGLE_NODE', () => {
    it('handles toggling a node property to true', () => {
      const action = actions.toggleNode(id);

      const actualState = nodesInfoReducer(nonEmptyState, action);

      expect(actualState).toEqual(stateWithToggledNode);
    });

    it('handles toggling a node property to false', () => {
      const action = actions.toggleNode(id);

      const actualState = nodesInfoReducer(stateWithToggledNode, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('SAVE_NODE', () => {
    it('handles saving a new node text', () => {
      const action = actions.saveNode(id);

      const actualState = nodesInfoReducer(stateWithToggledNode, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });
});

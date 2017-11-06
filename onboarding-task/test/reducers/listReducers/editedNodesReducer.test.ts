import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/internalActionCreators/baseActionCreators';
import { editedNodesReducer } from '../../../src/reducers/nodesListReducers/editedNodesReducer';

describe('editedNodesReducer', () => {
  const emptyState = OrderedMap<Guid, boolean>();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const anotherId = '05012399-087d-4944-a742-7cf698e01b85';
  const nonEmptyState = emptyState.set(id, false);
  const stateWithToggledNode = emptyState.set(id, true);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = editedNodesReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('ADD_NODE_OPTIMISTIC', () => {
    it('handles adding a node', () => {
      const action = actions.addNodeOptimistically({
        id,
        text: 'text',
      });
      const expectedState = emptyState.set(id, false);

      const actualState = editedNodesReducer(emptyState, action);

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

      const actualState = editedNodesReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });

    it('successfully replaces a non persistent node', () => {
      const nodeDataToPost = {
        id: anotherId,
        text: 'some text',
      };
      const action = actions.addNodeSuccess(id, nodeDataToPost);
      const expectedState = emptyState.set(anotherId, false);

      const actualState = editedNodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('GET_NODES_SUCCESS', () => {
    it('handles fetching multiple nodes at once', () => {
      const action = actions.getNodesSuccess([{ id, text: ' ' }, { id: anotherId, text: 'aaa' }]);
      const expectedState = nonEmptyState.set(anotherId, false);

      const actualState = editedNodesReducer(emptyState, action);

      expect(expectedState).toEqual(actualState);
    });

    it('handles fetching 0 nodes', () => {
      const action = actions.getNodesSuccess([]);

      const actualState = editedNodesReducer(emptyState, action);

      expect(emptyState).toEqual(actualState);
    });
  });

  describe('DELETE_NODE_SUCCESS', () => {
    it('handles deleting a node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = editedNodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node', () => {
      const action = actions.deleteNodeSuccess(id);

      const actualState = editedNodesReducer(emptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node from non empty state', () => {
      const action = actions.deleteNodeSuccess('80185242-d624-b669-5d3c-37c11523ba85');

      const actualState = editedNodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('TOGGLE_NODE', () => {
    it('handles toggling a node property to true', () => {
      const action = actions.toggleNode(id);

      const actualState = editedNodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(stateWithToggledNode);
    });

    it('handles toggling a node property to false', () => {
      const action = actions.toggleNode(id);

      const actualState = editedNodesReducer(stateWithToggledNode, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('UPDATE_NODE_SUCCESS', () => {
    it('handles saving a new node text', () => {
      const text = 'any text';
      const action = actions.updateNodeSuccess({
        id,
        text,
      });

      const actualState = editedNodesReducer(stateWithToggledNode, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });
});

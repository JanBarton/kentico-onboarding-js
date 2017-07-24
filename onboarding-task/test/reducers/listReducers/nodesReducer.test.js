import { OrderedMap } from 'immutable';

import * as actions from '../../../src/actions/actionCreators';
import { NodeContent } from '../../../src/models/NodeContent';
import { nodesReducer } from '../../../src/reducers/listReducers/nodesReducer';
import { addNodeFactory } from '../../../src/actions/addNodeFactory';

describe('nodesReducer', () => {
  const emptyState = OrderedMap();
  const id = '80149842-a624-b66b-5d3c-37c24523ba46';
  const addNode = addNodeFactory(() => id);
  const text = 'testing text';
  const node = new NodeContent({
    id,
    text,
  });
  const nonEmptyState = emptyState.set(id, node);

  it('returns initial state', () => {
    const initialState = undefined;
    const action = { type: 'UNKNOWN' };

    const actualState = nodesReducer(initialState, action);

    expect(actualState).toEqual(emptyState);
  });

  describe('ADD_NODE', () => {
    it('handles adding a node', () => {
      const action = addNode(text);

      const actualState = nodesReducer(emptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('DELETE_NODE', () => {
    it('handles deleting a node', () => {
      const action = actions.deleteNode(id);

      const actualState = nodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node', () => {
      const action = actions.deleteNode(id);

      const actualState = nodesReducer(emptyState, action);

      expect(actualState).toEqual(emptyState);
    });

    it('handles deleting a nonexistent node from non empty state', () => {
      const action = actions.deleteNode('44005242-d624-b669-5d3c-37c11523ba85');

      const actualState = nodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(nonEmptyState);
    });
  });

  describe('SAVE_NODE', () => {
    it('handles saving a new node text', () => {
      const newText = 'changed text';
      const updatedNode = new NodeContent({
        id,
        text: newText,
      });
      const newNonEmptyState = emptyState.set(id, updatedNode);
      const action = actions.saveNode(id, newText);

      const actualState = nodesReducer(nonEmptyState, action);

      expect(actualState).toEqual(newNonEmptyState);
    });
  });
});

import { NodeContent } from '../../src/models/NodeContent';
import { NodeInfo } from '../../src/models/NodeInfo';
import { createMemoizedNodeViewModel, createNodeViewModel } from '../../src/models/NodeViewModel';
import { generateId } from '../../src/utils/generateId';

describe('NodeViewModel', () => {
  const node = new NodeContent({
    id: generateId(),
    text: 'test text',
  });
  const nodeInfo = new NodeInfo();

  describe('createMemoizedNodeViewModel', () => {
    it('is really memoized', () => {
      const memoizedNodeViewModel = createMemoizedNodeViewModel(node, nodeInfo, 0);
      expect(memoizedNodeViewModel).toBe(createMemoizedNodeViewModel(node, nodeInfo, 0));
    });
  });
  describe('createNodeViewModel', () => {
    it('creates a new instance of the model every time when called', () => {
      const nodeViewModel = createNodeViewModel(node, nodeInfo, 0);
      expect(nodeViewModel).not.toBe(createNodeViewModel(node, nodeInfo, 0));
    });
  });
});

import * as actions from '../../src/actions/internalActionCreators/baseActionCreators.ts';
import * as types from '../../src/constants/actionTypes.ts';

const id = '80149842-a624-b66b-5d3c-37c24523ba46';

describe('actionCreators', () => {
  describe('addNodeOptimistically', () => {
    it('returns a correct new action', () => {
      const text = 'New action test';
      const expectedAction = {
        type: types.ADD_NODE_OPTIMISTIC,
        payload: {
          id,
          text,
        },
      };

      const actualAction = actions.addNodeOptimistically(expectedAction.payload);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('dismissError', () => {
    it('returns a correct new action', () => {
      const expectedAction = {
        type: types.DISMISS_ERROR,
        payload: {
          id,
        },
      };

      const actualAction = actions.dismissError(id);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('getNodesSuccess', () => {
    it('returns a correct new action', () => {
      const nodes = [
        {
          id,
          text: 'some text',
        },
        {
          id: '02461b64-98dd-4ff5-8479-aaf02bba5b16',
          text: 'show me what you got',
        },
      ];
      const expectedAction = {
        type: types.GET_NODES_SUCCESS,
        payload: {
          nodes,
        },
      };

      const actualAction = actions.getNodesSuccess(nodes);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('addNodeSuccess', () => {
    it('returns a correct new action', () => {
      const text = 'some text';
      const temporaryId = '849e43f2-55de-48fe-ae4b-3510e60b17ca';
      const expectedAction = {
        type: types.ADD_NODE_SUCCESS,
        payload: {
          id,
          text,
          temporaryId,
        },
      };

      const actualAction = actions.addNodeSuccess(temporaryId, {
        id,
        text,
      });

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('deleteNodeSuccess', () => {
    it('returns a correct new action', () => {
      const expectedAction = {
        type: types.DELETE_NODE_SUCCESS,
        payload: {
          id,
        },
      };

      const actualAction = actions.deleteNodeSuccess(id);

      expect(actualAction).toEqual(expectedAction);
    });
  });

  describe('toggleNode', () => {
    it('returns a correct new action', () => {
      const expectedAction = {
        type: types.TOGGLE_NODE,
        payload: {
          id,
        },
      };

      expect(actions.toggleNode(id)).toEqual(expectedAction);
    });
  });

  describe('updateNodeSuccess', () => {
    it('returns a correct new action', () => {
      const text = 'random text';
      const nodeDataToPut = {
        id,
        text,
      };
      const expectedAction = {
        type: types.UPDATE_NODE_SUCCESS,
        payload: {
          id,
          text,
        },
      };

      expect(actions.updateNodeSuccess(nodeDataToPut)).toEqual(expectedAction);
    });
  });
});

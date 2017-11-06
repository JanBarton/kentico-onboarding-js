import { getNodesFactory } from './internalActionCreators/getNodesFactory';
import {
  deleteNodeFailure,
  deleteNodeStart,
  deleteNodeSuccess,
  getNodesFailure,
  getNodesStart,
  getNodesSuccess,
  addNodeFailure,
  addNodeOptimistically,
  addNodeStart,
  addNodeSuccess,
  updateNodeFailure,
  updateNodeStart,
  updateNodeSuccess,
  toggleNode,
  dismissError,
} from './internalActionCreators/baseActionCreators';
import { parseFetchedNode, parseFetchedNodes } from '../utils/parseFetchedNodes';
import { addNodeFactory } from './internalActionCreators/addNodeFactory';
import { deleteNodeFactory } from './internalActionCreators/deleteNodeFactory';
import { generateId } from '../utils/generateId';
import { updateNodeFactory } from './internalActionCreators/updateNodeFactory';
import {
  addNodeFetch,
  deleteNodeFetch,
  getNodesFetch,
  updateNodeFetch,
} from '../repositories/apiAdapter';

export const getNodes = getNodesFactory({
  getNodesFetch,
  getNodesStart,
  getNodesSuccess,
  getNodesFailure,
  parseFetchedNodes
});

export const addNode = addNodeFactory({
  addNodeFetch,
  addNodeStart,
  addNodeOptimistically,
  addNodeSuccess,
  addNodeFailure,
  parseFetchedNode,
  idGenerator: generateId,
});

export const updateNode = updateNodeFactory({
  updateNodeStart,
  updateNodeFetch,
  updateNodeSuccess,
  updateNodeFailure,
});

export const deleteNode = deleteNodeFactory({
  deleteNodeStart,
  deleteNodeFailure,
  deleteNodeSuccess,
  deleteNodeFetch
});

export {
  toggleNode,
  dismissError,
};

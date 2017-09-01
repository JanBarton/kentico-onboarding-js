import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
  FETCH_NODES_REQUEST,
  FETCH_NODES_SUCCESS,
  FETCH_NODES_FAILURE
} from './actionTypes';
import { addNodeFactory } from './addNodeFactory';
import { generateId } from '../utils/generateId';
import { IAction } from './IAction';
import { NodeContent } from '../models/NodeContent';

export const addNode = addNodeFactory(generateId);

export const toggleNode = (id: IdType): IAction => ({
  type: TOGGLE_NODE,
  payload: {
    id,
  },
});

export const deleteNode = (id: IdType): IAction => ({
  type: DELETE_NODE,
  payload: {
    id,
  },
});

export const saveNode = (id: IdType, text: string): IAction => ({
  type: SAVE_NODE,
  payload: {
    id,
    text,
  },
});

export const fetchNodesRequest = (): IAction => ({
  type: FETCH_NODES_REQUEST,
  payload: {}
});

export const fetchNodesSuccess = (): IAction => ({
  type: FETCH_NODES_SUCCESS,
  payload: {}
});

export const fetchNodesFailure = (): IAction => ({
  type: FETCH_NODES_FAILURE,
  payload: {}
});

const parseNodes = (nodes: Array<object>, dispatch: Dispatch): void => {
  for (const node of nodes) {
    let text = (new NodeContent(node)).text;
    dispatch(addNode(text));
  }
};

export const fetchNodes = (): any =>
  (dispatch: any) => {
    return fetch('api/v1/nodes')
      .then((response) => response.json())
      .then((json) => parseNodes(json, dispatch))
      .catch((error) => console.log(error));
  };

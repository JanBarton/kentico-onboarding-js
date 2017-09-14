import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
  FETCH_NODES_REQUEST,
  FETCH_NODES_SUCCESS,
  FETCH_NODES_FAILURE,
  DELETE_ERROR,
  POST_NODE_REQUEST,
  POST_NODE_SUCCESS,
  POST_NODE_FAILURE
} from './actionTypes';
import { IAction } from './IAction';
import { DEFAULT_ROUTE } from '../constants/routes';
import { fetchNodesFactory } from './fetchNodesFactory';

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

export const fetchNodesSuccess = (nodes: Array<object>): IAction => ({
  type: FETCH_NODES_SUCCESS,
  payload: {
    nodes
  }
});

export const fetchNodesFailure = (text: string): IAction => ({
  type: FETCH_NODES_FAILURE,
  payload: {
    text
  }
});

export const postNodeRequest = (): IAction => ({
  type: POST_NODE_REQUEST,
  payload: {}
});

export const postNodeSuccess = ({id, text}: IFetchedNode): IAction => ({
  type: POST_NODE_SUCCESS,
  payload: {
    id,
    text
  }
});

export const postNodeFailure = (text: string): IAction => ({
  type: POST_NODE_FAILURE,
  payload: {
    text
  }
});

export const deleteError = (id: IdType): IAction => ({
  type: DELETE_ERROR,
  payload: {
    id
  }
});

export interface IFetchedNode {
  id: IdType;
  text: string;
}

const parseFetchedNodes = (nodes: Array<IFetchedNode>): Array<IFetchedNode> => nodes.map(({id, text}) => ({id, text}));

export const fetchNodes = fetchNodesFactory({
  route: DEFAULT_ROUTE,
  fetchRequest: fetchNodesRequest,
  fetchSuccess: fetchNodesSuccess,
  fetchFailure: fetchNodesFailure,
  parseFetchedNodes,
});

export const postNode = (text: string): any =>
  (dispatch: Dispatch) => {
    dispatch(postNodeRequest());
    return fetch(DEFAULT_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
      .then(response => response.json())
      .then(json => dispatch(postNodeSuccess({id: json.id, text: json.text})))
      .catch(error => {
        return dispatch(postNodeFailure(error.message));
      });
  };

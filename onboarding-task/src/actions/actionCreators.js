import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from './actionTypes';
import { addNodeFactory } from './addNodeFactory';
import { generateId } from '../utils/generateId';

export const addNode = addNodeFactory(generateId);

export const toggleNode = id => ({
  type: TOGGLE_NODE,
  payload: {
    id,
  },
});

export const deleteNode = id => ({
  type: DELETE_NODE,
  payload: {
    id,
  },
});

export const saveNode = (id, text) => ({
  type: SAVE_NODE,
  payload: {
    id,
    text,
  },
});

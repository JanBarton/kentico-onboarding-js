import {
  TOGGLE_NODE,
  SAVE_NODE,
  DELETE_NODE,
} from './actionTypes';
import { addNodeFactory } from './addNodeFactory';
import { generateId } from '../utils/generateId';

interface IAddNode {
  (text: string): IAction;
}

// TODO
export const addNode: IAddNode = addNodeFactory(generateId);

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

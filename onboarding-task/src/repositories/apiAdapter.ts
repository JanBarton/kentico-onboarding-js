import { API_URL } from '../constants/urls';
import { INodeContent } from '../models/NodeContent';

const checkStatus = (response: Response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const getNodesFetch = () => fetch(API_URL)
  .catch(() => {
    throw new Error('Server is disconnected, could not fetch data. ');
  })
  .then(response => checkStatus(response))
  .then(response => response.json());

export const addNodeFetch = (text: string) => fetch(API_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({text}),
})
  .catch(() => {
    throw new Error('Server is disconnected, could not add node with text: ' + text + '. ');
  })
  .then(response => checkStatus(response))
  .then(response => response.json());

export const updateNodeFetch = ({id, text}: INodeContent) => fetch(API_URL + '/' + id, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text
  }),
})
  .catch(() => {
    throw new Error('Server is disconnected, could not save node with updated text: ' + text + '. ');
  })
  .then(response => checkStatus(response))
  .then(response => response.json());

export const deleteNodeFetch = (id: Guid) => fetch(API_URL + '/' + id, {
  method: 'DELETE',
  body: JSON.stringify(id),
})
  .catch(() => {
    throw new Error('Server is disconnected, could not delete selected node.');
  })
  .then(response => checkStatus(response));

import { Promise } from 'es6-promise';

import { addNodeFactory } from '../../src/actions/internalActionCreators/addNodeFactory';

describe('addNodeFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const identityFunction = jest.fn((input: any) => input);
  const addNodeStart = jest.fn(() => 'REQUEST_HAS_BEEN_CALLED');
  const idGenerator = jest.fn(() => '6267be54-5dbd-4ced-9c90-3a197ddb5107');

  it('dispatches addNodeStart action', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const dispatch = identityFunction;

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeStart,
      addNodeOptimistically: identityFunction,
      addNodeSuccess: identityFunction,
      addNodeFailure: identityFunction,
      parseFetchedNode: identityFunction,
      idGenerator
    });

    return postNode(text)(dispatch).then(() => {
      expect(addNodeStart.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual('REQUEST_HAS_BEEN_CALLED');
    });
  });

  it('dispatches optimistic post action with correct data', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const dispatch = identityFunction;
    const addNodeOptimistically = jest.fn(() => 'something');

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeStart,
      addNodeOptimistically,
      addNodeSuccess: identityFunction,
      addNodeFailure: identityFunction,
      parseFetchedNode: identityFunction,
      idGenerator
    });

    return postNode(text)(dispatch).then(() => {
      expect(addNodeOptimistically.mock.calls.length).toEqual(1);

      const dispatchCallArguments = dispatch.mock.calls[1][0];
      const expectedId = idGenerator();

      expect(dispatchCallArguments.id).toEqual(expectedId);
      expect(dispatchCallArguments.text).toEqual(text);
    });
  });

  it('addNodeFetch method has been called', () => {
    const myFetch = jest.fn(() => Promise.resolve(node));
    const dispatch = identityFunction;

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeStart,
      addNodeOptimistically: identityFunction,
      addNodeFailure: identityFunction,
      addNodeSuccess: identityFunction,
      parseFetchedNode: identityFunction,
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('dispatches addNodeSuccess action correctly ', () => {
    const temporaryId = idGenerator();
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const parseFetchedNode = jest.fn(() => ({id, text}));
    const addNodeSuccess = jest.fn(() => ({
      type: 'ADD_NODE_SUCCESS',
      payload: {
        id,
        text,
        temporaryId,
      },
    }));
    const dispatch = jest.fn(input => input);

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeStart: identityFunction,
      addNodeOptimistically: identityFunction,
      addNodeSuccess,
      addNodeFailure: identityFunction,
      parseFetchedNode,
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => {
      expect(addNodeSuccess.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[2][0]).toEqual(addNodeSuccess());
    });
  });

  it('dispatches addNodeFailure correctly', () => {
    const myFetch = jest.fn(() => Promise.reject(new Response(JSON.stringify({ok: false}))));
    const addNodeFailure = jest.fn(() => 'Posting a node has failed.');
    const dispatch = identityFunction;

    const postNode = addNodeFactory({
      addNodeFetch: myFetch,
      addNodeStart: identityFunction,
      addNodeOptimistically: identityFunction,
      addNodeSuccess: identityFunction,
      addNodeFailure,
      parseFetchedNode: identityFunction,
      idGenerator,
    });

    return postNode(text)(dispatch).then(() => {
      expect(addNodeFailure.mock.calls.length).toEqual(1);
    });
  });
});

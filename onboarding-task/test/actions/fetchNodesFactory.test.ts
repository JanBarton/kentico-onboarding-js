import { getNodesFactory } from '../../src/actions/internalActionCreators/getNodesFactory';

describe('getNodesFactory', () => {
  const id = 'bf2c5661-bd00-4e10-9d2a-2562823041e3';
  const text = 'testing text';
  const node = {
    id,
    text,
  };
  const nodesArray = [node];
  const identityFunction = jest.fn((input: any) => input);
  const getNodesStart = jest.fn(() => ({type: 'FETCH_HAS_STARTED'}));

  it('dispatches getNodesFetch fetch request action', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodesArray));
    const dispatch = identityFunction;

    const fetchNodes = getNodesFactory({
      getNodesFetch: myFetch,
      getNodesStart,
      getNodesFailure: identityFunction,
      getNodesSuccess: identityFunction,
      parseFetchedNodes: identityFunction
    });

    return fetchNodes()(dispatch).then(() => {
      expect(getNodesStart.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual({type: 'FETCH_HAS_STARTED'});
    });
  });

  it('getNodesFetch method has been called', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodesArray));
    const dispatch = identityFunction;

    const fetchNodes = getNodesFactory({
      getNodesFetch: myFetch,
      getNodesStart,
      getNodesFailure: identityFunction,
      getNodesSuccess: identityFunction,
      parseFetchedNodes: identityFunction
    });

    return fetchNodes()(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('dispatches getNodesSuccess action correctly', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const dispatch = identityFunction;
    const getNodesSuccess = jest.fn(() => 'SUCCESSFUL_FETCH');

    const fetchNodes = getNodesFactory({
      getNodesFetch: myFetch,
      getNodesStart: identityFunction,
      getNodesFailure: identityFunction,
      getNodesSuccess,
      parseFetchedNodes: jest.fn(() => nodesArray)
    });

    return fetchNodes()(dispatch).then(() => {
      expect(getNodesSuccess.mock.calls.length).toEqual(1);
      const dispatchCallArguments = dispatch.mock.calls[1][0];

      expect(dispatchCallArguments).toEqual(nodesArray);
    });
  });

  it('dispatches getNodesFailure correctly', () => {
    const myFetch = jest.fn(() => Promise.reject(new Response(JSON.stringify({ok: false}))));
    const dispatch = identityFunction;
    const getNodesFailure = jest.fn(() => 'Getting nodes has failed.');

    const fetchNodes = getNodesFactory({
      getNodesFetch: myFetch,
      getNodesStart: identityFunction,
      getNodesFailure,
      getNodesSuccess: identityFunction,
      parseFetchedNodes: identityFunction
    });

    return fetchNodes()(dispatch).then(() => {
      expect(getNodesFailure.mock.calls.length).toEqual(1);
    });
  });
});

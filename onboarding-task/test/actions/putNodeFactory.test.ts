import { Promise } from 'es6-promise';

import { updateNodeFactory } from '../../src/actions/internalActionCreators/updateNodeFactory';

describe('updateNodeFactory', () => {

  const id = 'ef081749-250b-4c35-af07-4ff4364bafa1';
  const text = 'some random text';
  const nodeDataToPut = {id, text};
  const identityFunction = jest.fn((input: any) => input);

  const updateNodeStart = jest.fn(() => ({
    type: 'UPDATE_START'
  }));

  it('dispatches updateNodeStart action', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodeDataToPut));
    const dispatch = identityFunction;

    const putNode = updateNodeFactory({
      updateNodeStart,
      updateNodeFetch: myFetch,
      updateNodeSuccess: identityFunction,
      updateNodeFailure: identityFunction,
    });

    return putNode(nodeDataToPut)(dispatch).then(() => {
      expect(updateNodeStart.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual({type: 'UPDATE_START'});
    });
  });

  it('calls updateNodeFetch method', () => {
    const myFetch = jest.fn(() => Promise.resolve(nodeDataToPut));
    const dispatch = identityFunction;

    const putNode = updateNodeFactory({
      updateNodeStart,
      updateNodeFetch: myFetch,
      updateNodeSuccess: identityFunction,
      updateNodeFailure: identityFunction,
    });

    return putNode(nodeDataToPut)(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('dispatches updateNodeSuccess action correctly', () => {
    const myFetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify({ok: true}))));
    const dispatch = identityFunction;
    const updateNodeSuccess = jest.fn(() => 'SUCCESSFUL_UPDATE');

    const putNode = updateNodeFactory({
      updateNodeStart,
      updateNodeFetch: myFetch,
      updateNodeSuccess,
      updateNodeFailure: identityFunction,
    });

    return putNode(nodeDataToPut)(dispatch).then(() => {
      expect(updateNodeSuccess.mock.calls.length).toEqual(1);
      const dispatchCallArguments = dispatch.mock.calls[1][0];

      expect(dispatchCallArguments).toEqual(nodeDataToPut);
    });
  });

  it('dispatches updateNodeFailure correctly', () => {
    const myFetch = jest.fn(() => Promise.reject(new Response(JSON.stringify({ok: false}))));
    const dispatch = identityFunction;
    const updateNodeFailure = jest.fn(() => 'deleting failed');

    const putNode = updateNodeFactory({
      updateNodeStart,
      updateNodeFetch: myFetch,
      updateNodeSuccess: identityFunction,
      updateNodeFailure,
    });

    return putNode(nodeDataToPut)(dispatch).then(() =>
      expect(updateNodeFailure.mock.calls.length).toEqual(1));
  });
});

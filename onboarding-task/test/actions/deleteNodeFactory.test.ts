import { deleteNodeFactory } from '../../src/actions/internalActionCreators/deleteNodeFactory';

describe('deleteNodeFactory', () => {
  const id = 'ef081749-250b-4c35-af07-4ff4364bafa1';
  const identityFunction = jest.fn((input: any) => input);

  const deleteNodeStart = jest.fn(() => ({
    type: 'DELETE_REQUEST'
  }));

  it('dispatches deleteNodeStart action', () => {
    const myFetch = jest.fn(() => Promise.resolve(id));
    const dispatch = identityFunction;

    const deleteNode = deleteNodeFactory({
      deleteNodeStart,
      deleteNodeSuccess: identityFunction,
      deleteNodeFailure: identityFunction,
      deleteNodeFetch: myFetch,
    });

    return deleteNode(id)(dispatch).then(() => {
      expect(deleteNodeStart.mock.calls.length).toEqual(1);
      expect(dispatch.mock.calls[0][0]).toEqual({type: 'DELETE_REQUEST'});
    });
  });

  it('deleteNodeFetch method has been called', () => {
    const myFetch = jest.fn(() => Promise.resolve(id));
    const dispatch = identityFunction;

    const deleteNode = deleteNodeFactory({
      deleteNodeStart,
      deleteNodeSuccess: identityFunction,
      deleteNodeFailure: identityFunction,
      deleteNodeFetch: myFetch,
    });

    return deleteNode(id)(dispatch).then(() => expect(myFetch.mock.calls.length).toEqual(1));
  });

  it('dispatches deleteNodeSuccess action correctly', () => {
    const myFetch = () => Promise.resolve(new Response(JSON.stringify({ok: true})));
    const dispatch = identityFunction;
    const deleteNodeSuccess = jest.fn(() => 'successful delete');

    const deleteNode = deleteNodeFactory({
      deleteNodeStart,
      deleteNodeSuccess,
      deleteNodeFailure: identityFunction,
      deleteNodeFetch: myFetch,
    });

    return deleteNode(id)(dispatch).then(() => {
      expect(deleteNodeSuccess.mock.calls.length).toEqual(1);
      const dispatchCallArguments = dispatch.mock.calls[1][0];

      expect(dispatchCallArguments).toEqual(id);
    });
  });

  it('dispatches deleteNodeFailure correctly', () => {
    const myFetch = jest.fn(() => Promise.reject(new Response(JSON.stringify({ok: false}))));
    const dispatch = identityFunction;
    const deleteNodeFailure = jest.fn(() => 'deleting failed');

    const deleteNode = deleteNodeFactory({
      deleteNodeStart,
      deleteNodeSuccess: identityFunction,
      deleteNodeFailure,
      deleteNodeFetch: myFetch,
    });

    return deleteNode(id)(dispatch).then(() => {
      expect(deleteNodeFailure.mock.calls.length).toEqual(1);
    });
  });
});

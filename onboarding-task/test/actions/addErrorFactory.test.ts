import { errorFactory } from '../../src/actions/internalActionCreators/addErrorFactory';

const id = '05d0e770-b33e-4a1b-bdf8-138916d405ef';
const generateId = jest.fn(() => id);

describe('addErrorFactory', () => {
  it('returns a correct new error action', () => {
    const actionType = 'ERROR TYPE';
    const text = 'Never be like you.';
    const expectedAction = {
      type: actionType,
      payload: {
        id,
        text,
      },
    };

    const actualAction = errorFactory(generateId, actionType)(text);

    expect(actualAction).toEqual(expectedAction);
  });
});

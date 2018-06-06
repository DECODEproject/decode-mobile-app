import createAuthorizationAction from '../../../../../application/redux/actions/authorization';
import types from '../../../../../application/redux/actionTypes';

describe('authorization with pin', () => {
  it('should return pinCorrect action if the pin is actually correct', async () => {
    const getStoredPinFn = jest.fn().mockReturnValue(Promise.resolve('1234'));
    const action = await createAuthorizationAction('1234', getStoredPinFn);

    expect(action).toEqual({
      type: types.AUTHORIZATION_ACTION,
      pinCorrect: true,
    });
  });

  it('should return action with pinCorrect: false if the pin is wrong', async () => {
    const getStoredPinFn = jest.fn().mockReturnValue(Promise.resolve('1234'));
    const action = await createAuthorizationAction('6666', getStoredPinFn);

    expect(action).toEqual({
      type: types.AUTHORIZATION_ACTION,
      pinCorrect: false,
    });
  });
});

import createAuthorizationAction from '../../../../../application/redux/actions/authorization';
import types from '../../../../../application/redux/actionTypes';

describe('authorization with pin', () => {
  it('should return pinCorrect action if the pin is actually correct', () => {
    const action = createAuthorizationAction('1234');

    expect(action).toEqual({
      type: types.AUTHORIZATION_ACTION,
      pinCorrect: true,
    });
  });

  it('should return action with pinCorrect: false if the pin is wrong', () => {
    const action = createAuthorizationAction('6666');

    expect(action).toEqual({
      type: types.AUTHORIZATION_ACTION,
      pinCorrect: false,
    });
  });
});

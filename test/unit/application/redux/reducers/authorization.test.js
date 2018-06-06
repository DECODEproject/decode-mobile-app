import authorize from '../../../../../application/redux/reducers/authorization';
import types from '../../../../../application/redux/actionTypes';

describe('authorize', () => {
  it('should set authorized state to false by default', () => {
    const expectedState = { authorized: false };

    const actualState = authorize(undefined, {});

    expect(actualState).toEqual(expectedState);
  });

  it('should set authorized state to true if pin is correct', () => {
    const action = {
      type: types.AUTHORIZATION_ACTION,
      correctPin: true,
    };
    const initialState = { authorized: false };
    const expectedState = { authorized: true };

    const actualState = authorize(initialState, action);

    expect(actualState).toEqual(expectedState);
  });

  it('should set authorized state to false if pin is incorrect', () => {
    const action = {
      type: types.AUTHORIZATION_ACTION,
      correctPin: false,
    };
    const initialState = { authorized: false };
    const expectedState = { authorized: false };

    const actualState = authorize(initialState, action);

    expect(actualState).toEqual(expectedState);
  });
});

import authorize from '../../../../../application/redux/reducers/authorization';
import types from '../../../../../application/redux/actionTypes';

describe('authorize', () => {
  it('should set authorized state to false and pin undefined by default', () => {
    const expectedState = { authorized: false, pin: '' };

    const actualState = authorize(undefined, {});

    expect(actualState).toEqual(expectedState);
  });

  it('should set authorized state to true if pin is correct', () => {
    const action = {
      type: types.AUTHORIZATION_ACTION,
      correctPin: true,
    };
    const initialState = { authorized: false, pin: '6666' };
    const expectedState = { authorized: true, pin: '6666' };

    const actualState = authorize(initialState, action);

    expect(actualState).toEqual(expectedState);
  });

  it('should set authorized state to false if pin is incorrect', () => {
    const action = {
      type: types.AUTHORIZATION_ACTION,
      correctPin: false,
    };
    const initialState = { authorized: false, pin: '6666' };
    const expectedState = { authorized: false, pin: '6666' };

    const actualState = authorize(initialState, action);

    expect(actualState).toEqual(expectedState);
  });

  it('should save pin in state', () => {
    const action = {
      type: types.UPDATE_PIN_ACTION,
      pin: '5555',
    };
    const initialState = { authorized: false, pin: '6666' };
    const expectedState = { authorized: false, pin: '5555' };

    const actualState = authorize(initialState, action);

    expect(actualState).toEqual(expectedState);
  });

  it('should reset pin in state', () => {
    const action = {
      type: types.RESET_PIN_ACTION,
    };
    const initialState = { authorized: true, pin: '1234' };
    const expectedState = { authorized: true, pin: '' };

    const actualState = authorize(initialState, action);

    expect(actualState).toEqual(expectedState);
  });
});

import reducer from '../../../../../application/redux/reducers/login';
import types from '../../../../../application/redux/actionTypes';

describe('login reducer', () => {
  const defaultState = {
    credentials: [],
    isComingFromLogin: false,
  };
  it('should have default state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should change isComingFromLogin to true', () => {
    const action = {
      type: types.COMING_FROM_LOGIN,
    };

    expect(reducer(defaultState, action)).toEqual({
      credentials: [],
      isComingFromLogin: true,
    });
  });

  it('should set isComingFromLogin to false', () => {
    const initialState = {
      credentials: [],
      isComingFromLogin: true,
    };

    const action = {
      type: types.NOT_COMING_FROM_LOGIN,
    };

    expect(reducer(initialState, action)).toEqual({
      credentials: [],
      isComingFromLogin: false,
    });
  });
});

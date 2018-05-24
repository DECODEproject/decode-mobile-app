import reducer from '../../../../../application/redux/reducers/signOutcome';
import types from '../../../../../application/redux/actionTypes';

describe('signOutcome reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      signSuccess: false,
    });
  });

  it('should handle SIGN_OUTCOME', () => {
    const initialState = {
      signSuccess: false,
    };

    const action = {
      type: types.SIGN_OUTCOME,
      signSuccess: true,
    };

    expect(reducer(initialState, action)).toEqual({
      signSuccess: true,
    });
  });
});

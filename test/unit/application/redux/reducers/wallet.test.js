import reducer from '../../../../../application/redux/reducers/wallet';
import types from '../../../../../application/redux/actionTypes';

describe('wallet reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      id: '',
    });
  });

  it('should handle SET_WALLET_ID', () => {
    const initialState = { id: 'someId' };
    const newId = 'someNewId';
    const action = { type: types.SET_WALLET_ID, id: newId };

    expect(reducer(initialState, action)).toEqual({
      id: newId,
    });
  });
});

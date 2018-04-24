import reducer, { SET_WALLET_ID } from '../../../../application/redux/reducers/wallet';

describe('wallet reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      id: '',
    });
  });

  it('should handle SET_WALLET_ID', () => {
    const initialState = { id: 'someId' };
    const newId = 'someNewId';
    const action = { type: SET_WALLET_ID, id: newId };

    expect(reducer(initialState, action)).toEqual({
      id: newId,
    });
  });
});

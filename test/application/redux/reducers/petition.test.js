import reducer from '../../../../application/redux/reducers/petition';
import types from '../../../../application/redux/actionTypes';

describe('petition reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loaded: false,
      petition: {},
      error: undefined,
      signed: false,
    });
  });

  it('should handle SET_PETITION', () => {
    const initialState = {
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: undefined,
      signed: false,
    };

    const newPetition = { id: 'newPetition' };
    const action = {
      type: types.SET_PETITION,
      petition: newPetition,
    };

    expect(reducer(initialState, action)).toEqual({
      loaded: true,
      petition: newPetition,
      error: undefined,
      signed: false,
    });
  });

  it('should handle SET_PETITION_ERROR', () => {
    const initialState = {
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: undefined,
      signed: false,
    };
    const someError = 'someError';
    const action = {
      type: types.SET_PETITION_ERROR,
      error: someError,
    };

    expect(reducer(initialState, action)).toEqual({
      loaded: false,
      petition: {},
      error: someError,
      signed: false,
    });
  });

  it('should handle SIGN_PETITION', () => {
    const initialState = {
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: undefined,
      signed: false,
    };

    const action = {
      type: types.SIGN_PETITION,
    };

    expect(reducer(initialState, action)).toEqual({
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: undefined,
      signed: true,
    });
  });

  it('should handle SIGN_PETITION_ERROR', () => {
    const initialState = {
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: undefined,
      signed: false,
    };
    const someError = 'someError';
    const action = {
      type: types.SIGN_PETITION_ERROR,
      error: someError,
    };

    expect(reducer(initialState, action)).toEqual({
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: someError,
      signed: false,
    });
  });
});

import reducer, { SET_PETITION, SET_PETITION_ERROR } from '../../../../application/redux/reducers/petition';

describe('petition reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loaded: false,
      petition: {},
      error: undefined,
    });
  });

  it('should handle SET_PETITION', () => {
    const initialState = {
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: undefined,
    };

    const newPetition = { id: 'newPetition' };
    const action = {
      type: SET_PETITION,
      petition: newPetition,
    };

    expect(reducer(initialState, action)).toEqual({
      loaded: true,
      petition: newPetition,
      error: undefined,
    });
  });

  it('should handle SET_PETITION_ERROR', () => {
    const initialState = {
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: undefined,
    };
    const someError = 'someError';
    const action = {
      type: SET_PETITION_ERROR,
      error: someError,
    };

    expect(reducer(initialState, action)).toEqual({
      loaded: false,
      petition: {},
      error: someError,
    });
  });
});

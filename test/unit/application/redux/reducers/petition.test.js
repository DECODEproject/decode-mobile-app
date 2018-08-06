import reducer from '../../../../../application/redux/reducers/petition';
import types from '../../../../../application/redux/actionTypes';

describe('petition reducer', () => {
  const initialState = {
    loaded: false,
    petition: {},
    error: undefined,
    signed: false,
    petitionAttributes: [],
  };

  const initialStateWithPetition = {
    loaded: false,
    petition: { id: 'someInitialPetition' },
    error: undefined,
    signed: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_PETITION', () => {
    const newPetition = { id: 'newPetition' };
    const action = {
      type: types.SET_PETITION,
      petition: newPetition,
    };

    expect(reducer(initialStateWithPetition, action)).toEqual({
      loaded: true,
      petition: newPetition,
      error: undefined,
      signed: false,
      petitionAttributes: [],
    });
  });

  it('should handle SET_PETITION_ERROR', () => {
    const someError = 'someError';
    const action = {
      type: types.SET_PETITION_ERROR,
      error: someError,
    };

    expect(reducer(initialStateWithPetition, action)).toEqual({
      loaded: false,
      petition: {},
      error: someError,
      signed: false,
    });
  });

  it('should handle SIGN_PETITION', () => {
    const action = {
      type: types.SIGN_PETITION,
    };

    expect(reducer(initialStateWithPetition, action)).toEqual({
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: undefined,
      signed: true,
    });
  });

  it('should handle SIGN_PETITION_ERROR', () => {
    const someError = 'someError';
    const action = {
      type: types.SIGN_PETITION_ERROR,
      error: someError,
    };

    expect(reducer(initialStateWithPetition, action)).toEqual({
      loaded: false,
      petition: { id: 'someInitialPetition' },
      error: someError,
      signed: false,
    });
  });

  describe('Merge wallet attributes with petition', () => {
    const createPetitionWithAttr = attrs => ({
      id: 'somePetitionWithAttributes',
      attributes: attrs,
    });

    const attrResidency = {
      predicate: 'schema:addressLocality',
      object: 'Barcelona',
      scope: 'can-access',
      provenance: {
        source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
      },
    };

    const attrAge = {
      predicate: 'schema:dateOfBirth',
      object: 'myself',
      scope: 'can-access',
    };

    const petition = createPetitionWithAttr([attrResidency, attrAge]);


    it('should be empty if no wallet attributes', () => {
      const action = {
        type: types.SET_PETITION,
        petition,
        walletAttributes: [],
      };

      const expectedState = {
        loaded: true,
        petition,
        error: undefined,
        signed: false,
        petitionAttributes: [],
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should return addressLocality attribute when petition ask for it', () => {
      const walletAttribute = attrResidency;

      const action = {
        type: types.SET_PETITION,
        petition,
        walletAttributes: [walletAttribute],
      };

      const expectedState = {
        loaded: true,
        petition,
        error: undefined,
        signed: false,
        petitionAttributes: [walletAttribute],
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should not return addressLocality attribute when petition dont ask for it', () => {
      const petitionWithoutAddress = createPetitionWithAttr([]);

      const initialStateWithAddress = {
        loaded: false,
        petition: petitionWithoutAddress,
        error: undefined,
        signed: false,
      };

      const walletAttribute = attrResidency;

      const action = {
        type: types.SET_PETITION,
        petition: petitionWithoutAddress,
        walletAttributes: [walletAttribute],
      };

      const expectedState = {
        loaded: true,
        petition: petitionWithoutAddress,
        error: undefined,
        signed: false,
        petitionAttributes: [],
      };

      expect(reducer(initialStateWithAddress, action)).toEqual(expectedState);
    });
  });
});

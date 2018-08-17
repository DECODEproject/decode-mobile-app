import reducer from '../../../../../application/redux/reducers/petition';
import types from '../../../../../application/redux/actionTypes';

describe('petition reducer', () => {
  const createPetition = (mandatory = [], optional = []) => ({
    id: 'some-id',
    attributes: {
      mandatory,
      optional,
    },
  });

  const initialState = {
    loaded: false,
    petition: {},
    error: undefined,
    signed: false,
    enabledAttributes: [{ predicate: 'schema:addressLocality' }],
  };

  const initialStateWithPetition = {
    loaded: false,
    petition: createPetition(),
    error: undefined,
    signed: false,
    enabledAttributes: [],
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_PETITION', () => {
    const newPetition = createPetition();
    const action = {
      type: types.SET_PETITION,
      petition: newPetition,
    };

    expect(reducer(initialStateWithPetition, action)).toEqual({
      ...initialStateWithPetition,
      loaded: true,
      petition: newPetition,
      error: undefined,
    });
  });

  it('should handle SET_PETITION_ERROR', () => {
    const someError = 'someError';
    const action = {
      type: types.SET_PETITION_ERROR,
      error: someError,
    };

    expect(reducer(initialStateWithPetition, action)).toEqual({
      ...initialStateWithPetition,
      loaded: false,
      petition: {},
      error: someError,
    });
  });

  it('should handle SIGN_PETITION', () => {
    const action = {
      type: types.SIGN_PETITION,
    };

    expect(reducer(initialStateWithPetition, action)).toEqual({
      ...initialStateWithPetition,
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
      ...initialStateWithPetition,
      error: someError,
    });
  });

  describe('Merge wallet and petition attributes', () => {
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
      object: '01/01/1900',
      scope: 'can-access',
    };

    const attrGender = {
      predicate: 'schema:gender',
      object: 'female',
      scope: 'can-access',
    };

    it('should return attributes as missing if asking for attributes that do not exist in the wallet', () => {
      const action = {
        type: types.SET_PETITION,
        petition: createPetition([], [attrGender]),
        walletAttributes: new Map(),
      };

      expect(reducer(initialStateWithPetition, action)).toEqual({
        ...initialStateWithPetition,
        loaded: true,
        petition: createPetition([], [attrGender]),
        error: undefined,
      });
    });

    it('should return addressLocality attribute when petition ask for it', () => {
      const petition = createPetition([attrResidency]);
      const action = {
        type: types.SET_PETITION,
        petition,
        walletAttributes: new Map([[attrResidency.predicate, attrResidency]]),
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        loaded: true,
        petition,
        error: undefined,
      });
    });

    it('should not return addressLocality attribute when petition does not ask for it, even if we have it in the wallet', () => {
      const petitionWithoutAddress = createPetition();

      const initialStateWithoutAddress = {
        loaded: false,
        petition: petitionWithoutAddress,
        error: undefined,
        signed: false,
        enabledAttributes: [],
      };

      const action = {
        type: types.SET_PETITION,
        petition: petitionWithoutAddress,
        walletAttributes: new Map([[attrResidency.predicate, attrResidency]]),
      };

      expect(reducer(initialStateWithoutAddress, action)).toEqual({
        ...initialStateWithoutAddress,
        loaded: true,
        petition: petitionWithoutAddress,
        error: undefined,
      });
    });

    it('should have DateOfBirth if asked, and in the wallet', () => {
      const petitionWithDateOfBirth = createPetition([], [attrAge]);
      const initialStateWithDateOfBirth = {
        loaded: false,
        petition: petitionWithDateOfBirth,
        error: undefined,
        signed: false,
      };

      const action = {
        type: types.SET_PETITION,
        petition: petitionWithDateOfBirth,
        walletAttributes: new Map([
          [attrAge.predicate, attrAge],
          [attrResidency.predicate, attrResidency],
        ]),
      };

      expect(reducer(initialStateWithDateOfBirth, action)).toEqual({
        ...initialStateWithDateOfBirth,
        loaded: true,
        petition: petitionWithDateOfBirth,
        error: undefined,
      });
    });
  });

  describe('Toggle enabled attributes', () => {
    it('should handle TOGGLE_ENABLE_ATTRIBUTE sets the state with the attribute predicate value', () => {
      const state = {
        enabledAttributes: [],
      };

      const action = {
        type: types.TOGGLE_ENABLE_ATTRIBUTE,
        attribute: { predicate: 'schema:addressLocality' },
      };

      expect(reducer(state, action)).toEqual({
        enabledAttributes: [{ predicate: 'schema:addressLocality' }],
      });
    });


    it('should remove if the attribute already in the enable list', () => {
      const state = {
        ...initialState,
        enabledAttributes: [{ predicate: 'schema:addressLocality' }],
      };

      const action = {
        type: types.TOGGLE_ENABLE_ATTRIBUTE,
        attribute: { predicate: 'schema:addressLocality' },
      };

      expect(reducer(state, action)).toEqual({
        ...state,
        enabledAttributes: [],
      });
    });

    it('should add a second enabledAttribute if does not exist', () => {
      const state = {
        ...initialState,
        enabledAttributes: [{ predicate: 'schema:addressLocality' }],
      };

      const action = {
        type: types.TOGGLE_ENABLE_ATTRIBUTE,
        attribute: { predicate: 'schema:dateOfBirth' },
      };

      const actualEnabledAttributes = reducer(state, action).enabledAttributes;
      const expectedEnabledAttributes = [{ predicate: 'schema:dateOfBirth' }, { predicate: 'schema:addressLocality' }];

      expect(actualEnabledAttributes).toEqual(expect.arrayContaining(expectedEnabledAttributes));
    });
  });
});

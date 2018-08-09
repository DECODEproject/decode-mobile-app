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
    petitionAttributes: {
      mandatory: [],
      optional: [],
    },
    enabledAttributes: ['schema:addressLocality'],
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
      petitionAttributes: {
        mandatory: [],
        optional: [],
      },
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

  describe('Merge wallet attributes with petition', () => {
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

    const petition = createPetition([attrResidency], [attrAge]);

    it('should be empty if no wallet attributes', () => {
      const action = {
        type: types.SET_PETITION,
        petition,
        walletAttributes: new Map(),
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        loaded: true,
        petition,
        error: undefined,
        petitionAttributes: {
          mandatory: [],
          optional: [],
        },
      });
    });

    it('should return addressLocality attribute when petition ask for it', () => {
      const walletAttribute = attrResidency;

      const action = {
        type: types.SET_PETITION,
        petition,
        walletAttributes: new Map([[walletAttribute.predicate, walletAttribute]]),
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        loaded: true,
        petition,
        error: undefined,
        petitionAttributes: {
          mandatory: [walletAttribute],
          optional: [],
        },
      });
    });

    it('should not return addressLocality attribute when petition dont ask for it, even if we have it in the wallet', () => {
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
        petitionAttributes: {
          mandatory: [],
          optional: [],
        },
      });
    });

    it('should have DateOfBirth if asked, and in the wallet', () => {
      const petitionWithDateOfBirth = createPetition([], [attrAge]);
      const initialStateWithAddress = {
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

      expect(reducer(initialStateWithAddress, action)).toEqual({
        ...initialStateWithAddress,
        loaded: true,
        petition: petitionWithDateOfBirth,
        error: undefined,
        petitionAttributes: {
          mandatory: [],
          optional: [attrAge],
        },
      });
    });

    it('should return empty if asking for attributes that do not exist in the wallet', () => {
      const action = {
        type: types.SET_PETITION,
        petition,
        walletAttributes: new Map(),
      };

      const expectedState = {
        ...initialStateWithPetition,
        loaded: true,
        petition,
        error: undefined,
        petitionAttributes: {
          mandatory: [],
          optional: [],
        },
      };

      expect(reducer(initialStateWithPetition, action)).toEqual(expectedState);
    });
  });

  describe('Toggle enabled attributes', () => {
    it('should handle TOGGLE_ENABLE_ATTRIBUTE sets the state with the attribute predicate value', () => {
      const action = {
        type: types.TOGGLE_ENABLE_ATTRIBUTE,
        attributeValue: 'schema:addressLocality',
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        enabledAttributes: [],
      });
    });


    it('should remove if the attribute already in the enable list', () => {
      const state = {
        ...initialState,
        enabledAttributes: ['schema:addressLocality'],
      };

      const action = {
        type: types.TOGGLE_ENABLE_ATTRIBUTE,
        attributeValue: 'schema:addressLocality',
      };

      expect(reducer(state, action)).toEqual({
        ...state,
        enabledAttributes: [],
      });
    });

    it('should add a second enabledAttribute if does not exist', () => {
      const state = {
        ...initialState,
        enabledAttributes: ['schema:addressLocality'],
      };

      const action = {
        type: types.TOGGLE_ENABLE_ATTRIBUTE,
        attributeValue: 'schema:dateOfBirth',
      };

      const actualEnabledAttributes = reducer(state, action).enabledAttributes;
      const expectedEnabledAttributes = ['schema:dateOfBirth', 'schema:addressLocality'];

      expect(actualEnabledAttributes).toEqual(expect.arrayContaining(expectedEnabledAttributes));
    });
  });
});

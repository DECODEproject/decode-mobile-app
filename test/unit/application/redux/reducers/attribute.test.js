import reducer from '../../../../../application/redux/reducers/attributes';
import types from '../../../../../application/redux/actionTypes';

describe('attribute reducer', () => {
  const barcelonaResidencyAttribute = {
    predicate: 'schema:addressLocality',
    object: 'Barcelona',
    scope: 'can-access',
    provenance: {
      source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
      credentials: '0123456789',
    },
    subject: '(Alpaca)',
  };

  const amsterdamResidencyAttribute = {
    predicate: 'schema:addressLocality',
    object: 'Amsterdam',
    scope: 'can-access',
    provenance: {
      source: 'http://villarriba-decode.s3-website-eu-west-1.amazonaws.com',
      credentials: '0987654321',
    },
    subject: '(Alpaca)',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      list: new Map(),
      errorSaveAttributes: false,
    });
  });

  it('should handle ADD_CREDENTIAL_FROM_URL', () => {
    const initialState = {
      list: new Map(),
    };

    const action = {
      type: types.ADD_CREDENTIAL_FROM_URL,
      attribute: {
        predicate: barcelonaResidencyAttribute.predicate,
        object: barcelonaResidencyAttribute.object,
        scope: barcelonaResidencyAttribute.scope,
        provenance: {
          url: barcelonaResidencyAttribute.provenance.source,
        },
      },
      walletId: barcelonaResidencyAttribute.subject,
      credential: barcelonaResidencyAttribute.provenance.credentials,
    };

    expect(reducer(initialState, action)).toEqual({
      list: new Map([[barcelonaResidencyAttribute.predicate, barcelonaResidencyAttribute]]),
    });
  });

  it('should handle ADD_CREDENTIAL_FROM_URL when wallet already has another attribute', () => {
    const initialState = {
      list: new Map([[amsterdamResidencyAttribute.predicate, amsterdamResidencyAttribute]]),
    };

    const action = {
      type: types.ADD_CREDENTIAL_FROM_URL,
      attribute: {
        predicate: barcelonaResidencyAttribute.predicate,
        object: barcelonaResidencyAttribute.object,
        scope: barcelonaResidencyAttribute.scope,
        provenance: {
          url: barcelonaResidencyAttribute.provenance.source,
        },
      },
      walletId: barcelonaResidencyAttribute.subject,
      credential: barcelonaResidencyAttribute.provenance.credentials,
    };
    expect(reducer(initialState, action)).toEqual({
      list: new Map([
        [amsterdamResidencyAttribute.predicate, amsterdamResidencyAttribute],
        [barcelonaResidencyAttribute.predicate, barcelonaResidencyAttribute],
      ]),
    });
  });

  it('should handle ADD_CREDENTIAL_FROM_URL from a attribute that already is in the state', () => {
    const initialState = {
      list: new Map([[barcelonaResidencyAttribute.predicate, barcelonaResidencyAttribute]]),
    };

    const action = {
      type: types.ADD_CREDENTIAL_FROM_URL,
      attribute: {
        predicate: barcelonaResidencyAttribute.predicate,
        object: barcelonaResidencyAttribute.object,
        scope: barcelonaResidencyAttribute.scope,
        provenance: {
          url: barcelonaResidencyAttribute.provenance.source,
        },
      },
      walletId: barcelonaResidencyAttribute.subject,
      credential: barcelonaResidencyAttribute.provenance.credentials,
    };

    expect(reducer(initialState, action)).toEqual({
      list: new Map([[barcelonaResidencyAttribute.predicate, barcelonaResidencyAttribute]]),
    });
  });

  it('should handle LOAD_ATTRIBUTES sets the state with the credentials of the action', () => {
    const initialState = {
      list: new Map([[amsterdamResidencyAttribute.predicate, amsterdamResidencyAttribute]]),
    };
    const action = {
      type: types.LOAD_ATTRIBUTES,
      attributes: new Map([
        [amsterdamResidencyAttribute.predicate, amsterdamResidencyAttribute],
        [barcelonaResidencyAttribute.predicate, barcelonaResidencyAttribute],
      ]),
    };

    expect(reducer(initialState, action)).toEqual({
      list: new Map([
        [amsterdamResidencyAttribute.predicate, amsterdamResidencyAttribute],
        [barcelonaResidencyAttribute.predicate, barcelonaResidencyAttribute],
      ]),
    });
  });

  it('should handle ADD_OPTIONAL_ATTRIBUTE adds the new attribute to the state', () => {
    const initialState = {
      list: new Map(),
    };

    const action = {
      type: types.ADD_OPTIONAL_ATTRIBUTE,
      attribute: {
        predicate: 'schema:dateOfBirth',
        object: '01/01/2000',
        scope: 'can-access',
        provenance: {
          source: 'wallet',
        },
        subject: 42,
      },
    };

    expect(reducer(initialState, action)).toEqual({
      list: new Map([
        ['schema:dateOfBirth', {
          predicate: 'schema:dateOfBirth',
          object: '01/01/2000',
          scope: 'can-access',
          provenance: {
            source: 'wallet',
          },
          subject: 42,
        }],
      ]),
    });
  });

  it('should handle SAVE_ATTRIBUTES_ERROR', () => {
    const initialState = {
      errorSaveAttributes: false,
    };

    const action = {
      type: types.SAVE_ATTRIBUTES_ERROR,
    };

    expect(reducer(initialState, action)).toEqual({
      errorSaveAttributes: true,
    });
  });

  it('should handle RESET_ATTRIBUTES_ERRORS resets error flags', () => {
    const initialState = {
      errorSaveAttributes: true,
    };

    const action = {
      type: types.RESET_ATTRIBUTES_ERRORS,
    };

    expect(reducer(initialState, action)).toEqual({
      errorSaveAttributes: false,
    });
  });
});

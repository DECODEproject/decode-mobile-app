import reducer from '../../../../application/redux/reducers/attributes';
import types from '../../../../application/redux/actionTypes';

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
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_CREDENTIAL_FROM_URL', () => {
    const initialState = [];

    const action = {
      type: types.ADD_CREDENTIAL_FROM_URL,
      attribute: {
        predicate: barcelonaResidencyAttribute.predicate,
        object: barcelonaResidencyAttribute.object,
        scope: barcelonaResidencyAttribute.scope,
        credentialIssuer: {
          url: barcelonaResidencyAttribute.provenance.source,
        },
      },
      walletId: barcelonaResidencyAttribute.subject,
      credential: barcelonaResidencyAttribute.provenance.credentials,
    };

    expect(reducer(initialState, action)).toEqual([barcelonaResidencyAttribute]);
  });

  it('should handle ADD_CREDENTIAL_FROM_URL when wallet already has another attribute', () => {
    const initialState = [amsterdamResidencyAttribute];

    const action = {
      type: types.ADD_CREDENTIAL_FROM_URL,
      attribute: {
        predicate: barcelonaResidencyAttribute.predicate,
        object: barcelonaResidencyAttribute.object,
        scope: barcelonaResidencyAttribute.scope,
        credentialIssuer: {
          url: barcelonaResidencyAttribute.provenance.source,
        },
      },
      walletId: barcelonaResidencyAttribute.subject,
      credential: barcelonaResidencyAttribute.provenance.credentials,
    };
    expect(reducer(initialState, action)).toEqual([
      amsterdamResidencyAttribute,
      barcelonaResidencyAttribute,
    ]);
  });

  it('should handle ADD_CREDENTIAL_FROM_URL from a attribute that already is in the state', () => {
    const initialState = [barcelonaResidencyAttribute];

    const action = {
      type: types.ADD_CREDENTIAL_FROM_URL,
      attribute: {
        predicate: barcelonaResidencyAttribute.predicate,
        object: barcelonaResidencyAttribute.object,
        scope: barcelonaResidencyAttribute.scope,
        credentialIssuer: {
          url: barcelonaResidencyAttribute.provenance.source,
        },
      },
      walletId: barcelonaResidencyAttribute.subject,
      credential: barcelonaResidencyAttribute.provenance.credentials,
    };

    expect(reducer(initialState, action)).toEqual([barcelonaResidencyAttribute]);
  });

  it('should handle LOAD_CREDENTIALS sets the state with the credentials of the action', () => {
    const initialState = [amsterdamResidencyAttribute];
    const action = {
      type: types.LOAD_ATTRIBUTES,
      attributes: [amsterdamResidencyAttribute, barcelonaResidencyAttribute],
    };

    expect(reducer(initialState, action)).toEqual([
      amsterdamResidencyAttribute,
      barcelonaResidencyAttribute,
    ]);
  });
});

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
      isRequiredAttributeEnabled: true,
      optionalAttributesToggleStatus: {
        age: false,
        gender: false,
      },
      list: [],
    });
  });

  it('should handle ADD_CREDENTIAL_FROM_URL', () => {
    const initialState = {
      isRequiredAttributeEnabled: true,
      list: [],
    };

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

    expect(reducer(initialState, action)).toEqual({
      isRequiredAttributeEnabled: true,
      list: [barcelonaResidencyAttribute],
    });
  });

  it('should handle ADD_CREDENTIAL_FROM_URL when wallet already has another attribute', () => {
    const initialState = {
      isRequiredAttributeEnabled: true,
      list: [amsterdamResidencyAttribute],
    };

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
    expect(reducer(initialState, action)).toEqual({
      isRequiredAttributeEnabled: true,
      list: [
        amsterdamResidencyAttribute,
        barcelonaResidencyAttribute,
      ],
    });
  });

  it('should handle ADD_CREDENTIAL_FROM_URL from a attribute that already is in the state', () => {
    const initialState = {
      isRequiredAttributeEnabled: true,
      list: [barcelonaResidencyAttribute],
    };

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

    expect(reducer(initialState, action)).toEqual({
      isRequiredAttributeEnabled: true,
      list: [barcelonaResidencyAttribute],
    });
  });

  it('should handle LOAD_ATTRIBUTES sets the state with the credentials of the action', () => {
    const initialState = {
      isRequiredAttributeEnabled: true,
      list: [amsterdamResidencyAttribute],
    };
    const action = {
      type: types.LOAD_ATTRIBUTES,
      attributes: [amsterdamResidencyAttribute, barcelonaResidencyAttribute],
    };

    expect(reducer(initialState, action)).toEqual({
      isRequiredAttributeEnabled: true,
      list: [
        amsterdamResidencyAttribute,
        barcelonaResidencyAttribute,
      ],
    });
  });

  it('should handle TOGGLE_REQUIRED_ATTRIBUTE sets the state with the updated isRequiredAttributeEnabled value', () => {
    const initialState = {
      isRequiredAttributeEnabled: true,
      list: [],
    };
    const action = {
      type: types.TOGGLE_REQUIRED_ATTRIBUTE,
      toggleValue: false,
    };

    expect(reducer(initialState, action)).toEqual({
      isRequiredAttributeEnabled: false,
      list: [],
    });
  });

  it('should handle TOGGLE_OPTIONAL_ATTRIBUTE sets the state with the updated optionalAttributesToggleStatus values', () => {
    const initialState = {
      optionalAttributesToggleStatus: {
        age: false,
        gender: false,
      },
    };
    const action = {
      type: types.TOGGLE_OPTIONAL_ATTRIBUTE,
      attributeName: 'age',
      toggleValue: true,
    };

    expect(reducer(initialState, action)).toEqual({
      optionalAttributesToggleStatus: {
        age: true,
        gender: false,
      },
    });
  });

  it('should handle ADD_OPTIONAL_ATTRIBUTE adds the new attribute to the state', () => {
    const initialState = {
      list: [],
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
      list: [{
        predicate: 'schema:dateOfBirth',
        object: '01/01/2000',
        scope: 'can-access',
        provenance: {
          source: 'wallet',
        },
        subject: 42,
      }],
    });
  });
});

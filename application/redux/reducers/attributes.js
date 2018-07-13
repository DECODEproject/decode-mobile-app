import types from '../actionTypes';

const initialState = {
  isRequiredAttributeEnabled: true,
  optionalAttributesToggleStatus: {
    age: false,
    gender: false,
  },
  nonVerified: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CREDENTIAL_FROM_URL: {
      const newAttribute = {
        predicate: action.attribute.predicate,
        object: action.attribute.object,
        scope: action.attribute.scope,
        provenance: {
          source: action.attribute.credentialIssuer.url,
          credentials: action.credential,
        },
        subject: action.walletId,
      };

      const alreadyExists = state.nonVerified.filter(attr =>
        attr.predicate === newAttribute.predicate && attr.object === newAttribute.object);

      if (alreadyExists.length > 0) {
        return state;
      }
      return {
        ...state,
        nonVerified: [...state.nonVerified, newAttribute],
      };
    }
    case types.LOAD_ATTRIBUTES:
      return {
        ...state,
        nonVerified: action.attributes,
      };
    case types.TOGGLE_REQUIRED_ATTRIBUTE:
      return {
        ...state,
        isRequiredAttributeEnabled: action.toggleValue,
      };
    case types.TOGGLE_OPTIONAL_ATTRIBUTE: {
      const newState = { ...state };
      newState.optionalAttributesToggleStatus[action.attributeName] = action.toggleValue;
      return newState;
    }
    default:
      return state;
  }
}

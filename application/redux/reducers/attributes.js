import types from '../actionTypes';

const initialState = {
  isRequiredAttributeEnabled: true,
  optionalAttributesToggleStatus: {
    age: false,
    gender: false,
  },
  list: new Map(),
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

      return {
        ...state,
        list: state.list.set(newAttribute.predicate, newAttribute),
      };
    }
    case types.LOAD_ATTRIBUTES:
      return {
        ...state,
        list: action.attributes,
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
    case types.ADD_OPTIONAL_ATTRIBUTE:
      return {
        ...state,
        list: state.list.set(action.attribute.predicate, action.attribute),
      };
    default:
      return state;
  }
}

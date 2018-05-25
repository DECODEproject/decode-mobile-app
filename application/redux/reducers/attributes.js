import types from '../actionTypes';

const initialState = {
  isRequiredAttributeEnabled: true,
  list: [],
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

      const alreadyExists = state.list.filter(attr =>
        attr.predicate === newAttribute.predicate && attr.object === newAttribute.object);

      if (alreadyExists.length > 0) {
        return state;
      }
      return {
        ...state,
        list: [...state.list, newAttribute],
      };
    }
    case types.LOAD_ATTRIBUTES:
      return {
        ...state,
        list: action.attributes,
      };
    case types.TOGGLE_ATTRIBUTE:
      return {
        ...state,
        isRequiredAttributeEnabled: action.toggleValue,
      };
    default:
      return state;
  }
}

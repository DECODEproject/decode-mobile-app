import types from '../actionTypes';

const initialState = [];

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

      return [...state, newAttribute];
    }
    case types.LOAD_ATTRIBUTES:
      return action.attributes;
    default:
      return state;
  }
}

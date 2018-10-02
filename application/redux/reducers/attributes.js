import types from '../actionTypes';

const initialState = {
  list: new Map(),
  errorSaveAttributes: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CREDENTIAL_FROM_URL: {
      const newAttribute = {
        predicate: action.attribute.predicate,
        object: action.attribute.object,
        scope: action.attribute.scope,
        provenance: {
          source: action.attribute.provenance.url,
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
    case types.ADD_OPTIONAL_ATTRIBUTE:
      return {
        ...state,
        list: state.list.set(action.attribute.predicate, action.attribute),
      };
    case types.SAVE_ATTRIBUTES_ERROR:
      return {
        ...state,
        errorSaveAttributes: true,
      };
    case types.RESET_ATTRIBUTES_ERRORS:
      return {
        ...state,
        errorSaveAttributes: false,
      };
    default:
      return state;
  }
}

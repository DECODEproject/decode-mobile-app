import types from '../actionTypes';

const initialState = {
  list: new Map(),
  errorEmptyDateOfBirth: false,
  errorSaveDateOfBirth: false,
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
    case types.EMPTY_DATE_OF_BIRTH_ERROR:
      return {
        ...state,
        errorEmptyDateOfBirth: true,
      };
    case types.SAVE_DATE_OF_BIRTH_ERROR:
      return {
        ...state,
        errorSaveDateOfBirth: true,
      };
    case types.RESET_DATE_OF_BIRTH_ERRORS:
      return {
        ...state,
        errorEmptyDateOfBirth: false,
        errorSaveDateOfBirth: false,
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

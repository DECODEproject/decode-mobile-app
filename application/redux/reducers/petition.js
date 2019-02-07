import types from '../actionTypes';

const initialState = {
  loaded: false,
  petition: {},
  error: undefined,
  signed: false,
  enabledAttributes: [{ predicate: 'schema:addressLocality' }],
};


const getAttributeIndex = (attr, list) => (
  list.findIndex(listAttr => listAttr.predicate === attr.predicate));

const toggleElementsInList = (element, list) => {
  const indexOfElement = getAttributeIndex(element, list);
  if (indexOfElement !== -1) {
    list.splice(indexOfElement, 1);
  } else {
    list.push(element);
  }
  return list.slice(0);
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PETITION: {
      const { petition } = action;
      return {
        ...state,
        loaded: true,
        petition,
        error: undefined,
      };
    }
    case types.SET_PETITION_ERROR:
      return {
        ...state,
        loaded: false,
        petition: {},
        error: action.error,
      };
    case types.SIGN_PETITION:
      return {
        ...state,
        signed: true,
        error: undefined,
      };
    case types.SIGN_PETITION_ERROR:
      return {
        ...state,
        signed: false,
        error: action.error,
      };
    case types.TOGGLE_ENABLE_ATTRIBUTE:
      return {
        ...state,
        enabledAttributes: toggleElementsInList(action.attribute, state.enabledAttributes),
      };
    default:
      return state;
  }
}

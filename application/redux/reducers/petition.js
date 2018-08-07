import types from '../actionTypes';

const initialState = {
  loaded: false,
  petition: {},
  error: undefined,
  signed: false,
  petitionAttributes: [],
  enabledAttributes: [],
};

const matchPetitionAttrWithWallet = (petitionAttrs, walletAttrs) => {
  if (!petitionAttrs) return [];
  return petitionAttrs.filter(petitionAttr =>
    walletAttrs.find(walletAttr => walletAttr.predicate === petitionAttr.predicate));
};

const toggleElementsInList = (element, list) => {
  const indexOfElement = list.indexOf(element);

  if (indexOfElement === -1) {
    list.push(element);
  } else {
    list.splice(indexOfElement, 1);
  }
  return list;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PETITION: {
      const { walletAttributes, petition } = action;
      return {
        ...state,
        loaded: true,
        petition,
        error: undefined,
        petitionAttributes: matchPetitionAttrWithWallet(petition.attributes, walletAttributes),
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
        error: action.error,
      };
    case types.TOGGLE_ENABLE_ATTRIBUTE:
      return {
        ...state,
        enabledAttributes: toggleElementsInList(action.attributeValue, state.enabledAttributes),
      };
    default:
      return state;
  }
}

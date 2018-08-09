import types from '../actionTypes';

const initialState = {
  loaded: false,
  petition: {},
  error: undefined,
  signed: false,
  petitionAttributes: {
    mandatory: [],
    optional: [],
  },
  enabledAttributes: ['schema:addressLocality'],
};

const matchPetitionAttrWithWallet = (petitionAttrs, walletAttrs) => {
  if (!petitionAttrs) return [];
  return petitionAttrs.filter(petitionAttr =>
    walletAttrs.get(petitionAttr.predicate));
};

const toggleElementsInList = (element, list) => {
  const indexOfElement = list.indexOf(element);

  if (indexOfElement === -1) {
    list.push(element);
  } else {
    list.splice(indexOfElement, 1);
  }
  return list.slice(0);
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
        petitionAttributes: {
          mandatory: matchPetitionAttrWithWallet(petition.attributes.mandatory, walletAttributes),
          optional: matchPetitionAttrWithWallet(petition.attributes.optional, walletAttributes),
        },
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
    case types.REFRESH_PETITION_ATTRIBUTES: {
      const petitionAttributes = state.petition.attributes;
      return {
        ...state,
        petitionAttributes: {
          mandatory: matchPetitionAttrWithWallet(petitionAttributes, action.walletAttributes),
          optional: matchPetitionAttrWithWallet(petitionAttributes, action.walletAttributes),
        },
      };
    }
    default:
      return state;
  }
}

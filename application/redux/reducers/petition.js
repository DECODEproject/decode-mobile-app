import types from '../actionTypes';

const initialState = {
  loaded: false,
  petition: {},
  error: undefined,
  signed: false,
  petitionAttributes: {
    mandatory: [],
    optional: [],
    missing: [],
  },
  enabledAttributes: ['schema:addressLocality'],
};

const matchPetitionAttrWithWallet = (petitionAttrs, walletAttrs) => {
  if (!petitionAttrs) return [];
  return petitionAttrs.filter(petitionAttr => walletAttrs.get(petitionAttr.predicate));
};

const findMissingAttr = (allPetitionAttrs, allMatchedAttrs) => {
  if (!allPetitionAttrs) return [];
  return allPetitionAttrs.filter(petitionAttr => !allMatchedAttrs.includes(petitionAttr));
};

const buildPetitionAttributes = (walletAttrs, petitionAttrs) => {
  const mandatory = matchPetitionAttrWithWallet(petitionAttrs.mandatory, walletAttrs);
  const optional = matchPetitionAttrWithWallet(petitionAttrs.optional, walletAttrs);

  const allPetitionAttrs = petitionAttrs.mandatory.concat(petitionAttrs.optional);
  const allMatchedAttrs = mandatory.concat(optional);

  const missing = findMissingAttr(allPetitionAttrs, allMatchedAttrs);

  return { mandatory, optional, missing };
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
        petitionAttributes: buildPetitionAttributes(walletAttributes, petition.attributes),
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

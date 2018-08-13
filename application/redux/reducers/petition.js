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
  enabledAttributes: [{ predicate: 'schema:addressLocality' }],
};

const matchPetitionAttrWithWallet = (petitionAttrs, walletAttrs) => {
  if (!petitionAttrs) return [];
  const matchedAttrs = [];
  petitionAttrs.forEach((attr) => {
    if (walletAttrs.get(attr.predicate)) matchedAttrs.push(walletAttrs.get(attr.predicate));
  });
  return matchedAttrs;
};

const findMissingAttr = (allPetitionAttrs, allMatchedAttrs) => {
  if (!allPetitionAttrs) return [];
  return allPetitionAttrs.filter(attr =>
    !allMatchedAttrs.find(matchAttr => matchAttr.predicate === attr.predicate));
};

const buildPetitionAttributes = (walletAttrs, petitionAttrs) => {
  const mandatory = matchPetitionAttrWithWallet(petitionAttrs.mandatory, walletAttrs);
  const optional = matchPetitionAttrWithWallet(petitionAttrs.optional, walletAttrs);

  const allPetitionAttrs = petitionAttrs.mandatory.concat(petitionAttrs.optional);
  const allMatchedAttrs = mandatory.concat(optional);

  const missing = findMissingAttr(allPetitionAttrs, allMatchedAttrs);

  return { mandatory, optional, missing };
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
        enabledAttributes: toggleElementsInList(action.attribute, state.enabledAttributes),
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

import types from '../actionTypes';

const initialState = {
  loaded: false,
  petition: {},
  error: undefined,
  signed: false,
  petitionAttributes: [],
};

const matchPetitionAttrWithWallet = (petitionAttrs, walletAttrs) => {
  if (!petitionAttrs) return [];
  return petitionAttrs.filter(petitionAttr =>
    walletAttrs.find(walletAttr => walletAttr.predicate === petitionAttr.predicate));
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

    default:
      return state;
  }
}

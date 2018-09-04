import types from '../actionTypes';

const initialState = {
  petitionLink: undefined,
  decidimAPIUrl: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PETITION_LINK:
      return {
        ...state,
        petitionLink: action.petitionLink,
      };
    case types.SET_DECIDIM_INFO:
      return {
        ...state,
        decidimAPIUrl: action.decidimAPIUrl,
        petitionId: action.petitionId,
      };
    default:
      return state;
  }
}

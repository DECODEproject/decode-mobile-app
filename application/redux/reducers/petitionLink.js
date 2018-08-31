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
    case types.SET_DECIDIM_API_URL:
      return {
        ...state,
        decidimAPIUrl: action.decidimAPIUrl,
      };
    default:
      return state;
  }
}

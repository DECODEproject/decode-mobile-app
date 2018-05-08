import types from '../actionTypes';

const initialState = {
  loaded: false,
  petition: {},
  error: undefined,
  signed: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PETITION:
      return {
        ...state,
        loaded: true,
        petition: action.petition,
        error: undefined,
      };
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

import types from '../actionTypes';

const initialState = {
  signSuccess: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_OUTCOME:
      return {
        ...state,
        signSuccess: action.signSuccess,
      };
    default:
      return state;
  }
}

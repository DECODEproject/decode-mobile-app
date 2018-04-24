import { types } from '../actionTypes';

const initialState = {
  loaded: false,
  petition: {
  },
  error: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PETITION:
      return {
        loaded: true,
        petition: action.petition,
        error: undefined,
      };
    case types.SET_PETITION_ERROR:
      return {
        loaded: false,
        petition: {},
        error: action.error,
      };
    default:
      return state;
  }
}

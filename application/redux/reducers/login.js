import types from '../actionTypes';

const initialState = {
  isComingFromLogin: false,
  credentials: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.COMING_FROM_LOGIN:
      return {
        ...state,
        isComingFromLogin: true,
      };
    case types.NOT_COMING_FROM_LOGIN:
      return {
        ...state,
        isComingFromLogin: false,
      };
    default:
      return state;
  }
}

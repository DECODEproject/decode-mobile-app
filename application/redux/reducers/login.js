import types from '../actionTypes';

const initialState = {
  isComingFromLogin: false,
  credentials: [],
  success: false,
  failed: false,
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
    case types.LOGIN_RESET:
      return {
        ...state,
        success: false,
        failed: false,
      };
    case types.LOGIN_SUCCEEDED:
      return {
        ...state,
        success: true,
        failed: false,
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        success: false,
        failed: true,
      };
    default:
      return state;
  }
}

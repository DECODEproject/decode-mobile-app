import types from '../actionTypes';

const initialState = {
  authorized: false,
  pin: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHORIZATION_ACTION:
      return {
        ...state,
        authorized: action.correctPin,
      };
    case types.UPDATE_PIN_ACTION:
      return {
        ...state,
        pin: action.pin,
      };
    case types.RESET_PIN_ACTION:
      return {
        ...state,
        pin: initialState.pin,
      };
    default:
      return state;
  }
};

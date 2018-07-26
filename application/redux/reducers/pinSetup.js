import types from '../actionTypes';

const initialState = {
  pin1: '',
  pin2: '',
  validEqual: true,
  validFormat: true,
};

const isPinEqual = (p, q) => p === q;
const isAtleast4Digits = p => p.length >= 4;
const isAllNumbers = p => p.match(/\D/) === null;

const isValidPin = pin1 =>
  isAtleast4Digits(pin1) &&
  isAllNumbers(pin1);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.PIN_SETUP_TEXT1_CHANGED:
      return {
        ...state,
        pin1: action.pin,
      };
    case types.PIN_SETUP_TEXT2_CHANGED:
      return {
        ...state,
        pin2: action.pin,
      };
    case types.PIN_SETUP_STORE:
      return {
        ...state,
        validFormat: isValidPin(state.pin1),
        validEqual: isPinEqual(state.pin1, state.pin2),
      };
    default:
      return state;
  }
}

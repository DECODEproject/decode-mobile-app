import types from '../actionTypes';

const initialState = {
  pin1: '',
  pin2: '',
  validated: false,
};

const isValidPin = (pin1, pin2) => false; // eslint-disable-line

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.PIN_SETUP_TEXT1_CHANGED:
      return {
        ...state,
        pin1: action.pin,
        validated: isValidPin(action.pin, state.pin2),
      };
    case types.PIN_SETUP_TEXT2_CHANGED:
      return {
        ...state,
        pin2: action.pin,
        validated: isValidPin(state.pin2, action.pin),
      };
    default:
      return state;
  }
}

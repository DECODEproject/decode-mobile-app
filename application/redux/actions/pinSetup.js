import types from '../actionTypes';

export function changeText1(pin) {
  return {
    type: types.PIN_SETUP_TEXT1_CHANGED,
    pin,
  };
}

export function changeText2(pin) {
  return {
    type: types.PIN_SETUP_TEXT2_CHANGED,
    pin,
  };
}

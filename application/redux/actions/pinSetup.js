import types from '../actionTypes';
import { storePinOnAppInitalization } from '../../../LocalStorage';

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

export function pinStored() {
  return {
    type: types.PIN_SETUP_STORE,
  };
}

export function storePin(setItem, pin) {
  return async (dispatch) => {
    await storePinOnAppInitalization(setItem, pin);
    dispatch(pinStored());
  };
}

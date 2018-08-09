import types from '../actionTypes';
import { storePinInPhone } from '../../../LocalStorage';
import { goToHome } from './navigation';

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

export function validate() {
  return {
    type: types.PIN_SETUP_VALIDATE,
  };
}

export function storePin(setItem, pin) {
  return async (dispatch, getState) => {
    await dispatch(validate());

    const { pinSetup: { valid } } = getState();

    if (valid) {
      await storePinInPhone(setItem, pin);
      dispatch(goToHome());
    }
  };
}

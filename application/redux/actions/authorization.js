import types from '../actionTypes';
import { retrievePin } from '../../../LocalStorage';


export default (pin, secureStoreGetItem) =>
  dispatch =>
    retrievePin(secureStoreGetItem).then(storedPin =>
      dispatch({
        type: types.AUTHORIZATION_ACTION,
        pinCorrect: pin === storedPin,
      }));

export function updatePin(pin) {
  return dispatch => dispatch({
    type: types.UPDATE_PIN_ACTION,
    pin,
  });
}

export function resetPin() {
  return dispatch => dispatch({
    type: types.RESET_PIN_ACTION,
  });
}

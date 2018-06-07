import types from '../actionTypes';
import { retrievePin } from '../../../LocalStorage';


export default (pin, secureStoreGetItem) =>
  dispatch =>
    retrievePin(secureStoreGetItem).then(storedPin =>
      dispatch({
        type: types.AUTHORIZATION_ACTION,
        pinCorrect: pin === storedPin,
      }));


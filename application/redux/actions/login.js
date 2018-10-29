import types from '../actionTypes';
import { isComingFromLogin, getLoginParameters } from '../../../lib/entryPoint';


export function setCredential(setItem, attribute) {
  return async (dispatch) => {
    const allCredentials = [attribute];
    return setItem('credentials', JSON.stringify(allCredentials)).then(() => dispatch({
      type: types.SET_CREDENTIALS,
      credentials: allCredentials,
    }));
  };
}

export function checkComingFromLogin() {
  return dispatch => isComingFromLogin().then((result) => {
    const comingFromLoginAction = {
      type: types.COMING_FROM_LOGIN,
    };
    const notComingFromLoginAction = {
      type: types.NOT_COMING_FROM_LOGIN,
    };
    return result ? dispatch(comingFromLoginAction) : dispatch(notComingFromLoginAction);
  });
}

export function doLogin(loginRequest, credential) {
  return async (dispatch) => {
    const { callback, sessionId } = await getLoginParameters();

    const success = await loginRequest(callback, sessionId, credential);

    dispatch({
      type: success ? types.LOGIN_SUCCEEDED : types.LOGIN_FAILED,
    });
  };
}

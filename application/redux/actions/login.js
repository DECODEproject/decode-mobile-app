import types from '../actionTypes';
import { isComingFromLogin, getLoginParameters } from '../../../lib/entryPoint';

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

export function doLogin(loginRequest, callback, sessionId, credential, fail=false) {
  return async (dispatch) => {
    const { callback: initialCallback, sessionId: initialessionId} = await getLoginParameters();
    const success = await loginRequest(callback || initialCallback, sessionId || initialessionId, credential, fail);
    dispatch({
      type: success ? types.LOGIN_SUCCEEDED : types.LOGIN_FAILED,
    });
  };
}

export function initLogin() {
  return dispatch => {
    dispatch({type: types.LOGIN_RESET});
  };
}

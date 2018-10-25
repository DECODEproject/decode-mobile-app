import types from '../actionTypes';
import isComingFromLogin from '../../../lib/entryPoint';

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


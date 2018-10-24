import types from '../actionTypes';
import isComingFromLogin from '../../../lib/entryPoint';

export function setCredential(getItem, setItem, attribute) {
  return async () => {
    getItem('credentials').then(async (credentials) => {
      const currentCredentials = (credentials === null) ? [] : credentials;
      const allCredentials = [...currentCredentials, attribute];
      await setItem('credentials', JSON.stringify(allCredentials));
    }).catch((e) => {
      console.log('error retrieving credential', e);
    });
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


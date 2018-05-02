import urlParse from 'url-parse';
import types from '../actionTypes';


export function addCredentialFromUrl(attribute, walletId, url) {
  const { query: { credential } } = urlParse(url, true);

  return {
    type: types.ADD_CREDENTIAL_FROM_URL,
    attribute,
    walletId,
    credential,
  };
}

export function storeCredentials(setItemAsync) {
  return (dispatch, getState) => {
    const state = getState();

    return setItemAsync('attributes', state.attributes).then(() => (dispatch({
      type: types.STORE_ATTRIBUTES,
      attributes: state.attributes,
    })));
  };
}

export function addCredential(attribute, walletId, url, setItemAsync) {
  return async (dispatch) => {
    await dispatch(addCredentialFromUrl(attribute, walletId, url));
    return dispatch(storeCredentials(setItemAsync));
  };
}

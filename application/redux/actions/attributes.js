import urlParse from 'url-parse';
import types from '../actionTypes';
import { goToAttributesLanding } from './navigation';


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

    return setItemAsync('attributes', JSON.stringify(state.attributes.list)).then(() => (dispatch({
      type: types.STORE_ATTRIBUTES,
      attributes: state.attributes.list,
    })));
  };
}

export function addCredential(attribute, walletId, url, setItemAsync) {
  return async (dispatch) => {
    await dispatch(addCredentialFromUrl(attribute, walletId, url));
    return dispatch(storeCredentials(setItemAsync));
  };
}

export function loadCredentials(getItemAsync) {
  return (dispatch) => {
    getItemAsync('attributes').then((attributes) => {
      dispatch({
        type: types.LOAD_ATTRIBUTES,
        attributes: attributes ? JSON.parse(attributes) : [],
      });
    });
  };
}

export function bubbleUpRequiredAttributeToggle(toggleValue) {
  return dispatch => dispatch({
    type: types.TOGGLE_REQUIRED_ATTRIBUTE,
    toggleValue,
  });
}

export function bubbleUpOptionalAttributeToggle(attributeName, toggleValue) {
  return dispatch => dispatch({
    type: types.TOGGLE_OPTIONAL_ATTRIBUTE,
    attributeName,
    toggleValue,
  });
}

export function saveDateOfBirth(dateOfBirth, walletId) {
  const addOptionalAttributeAction = {
    type: types.ADD_OPTIONAL_ATTRIBUTE,
    attribute: {
      predicate: 'schema:dateOfBirth',
      object: dateOfBirth,
      scope: 'can-access',
      provenance: {
        source: 'wallet',
      },
      subject: walletId,
    },
  };

  const saveDateOfBirthAction = {
    type: types.SAVE_DATE_OF_BIRTH,
    dateOfBirth,
  };

  return async (dispatch) => {
    dispatch(addOptionalAttributeAction);
    dispatch(goToAttributesLanding());
    dispatch(saveDateOfBirthAction);
  };
}

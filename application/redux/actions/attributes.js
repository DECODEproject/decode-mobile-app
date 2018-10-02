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

    return setItemAsync('attributes', JSON.stringify([...state.attributes.list.values()])).then(() => (
      dispatch({
        type: types.STORE_ATTRIBUTES,
        attributes: state.attributes.list,
      })
    ));
  };
}

export function addCredential(attribute, walletId, url, setItemAsync) {
  return async (dispatch) => {
    await dispatch(addCredentialFromUrl(attribute, walletId, url));
    const action = await dispatch(storeCredentials(setItemAsync));

    return action;
  };
}

export function loadCredentials(getItemAsync) {
  return (dispatch) => {
    getItemAsync('attributes').then((attributes) => {
      let parsedAttributes = attributes ? JSON.parse(attributes) : [];
      parsedAttributes = new Map(parsedAttributes.map(att => [att.predicate, att]));

      dispatch({
        type: types.LOAD_ATTRIBUTES,
        attributes: parsedAttributes,
      });
    });
  };
}

export function addOptionalAttribute(predicate, object, walletId) {
  return {
    type: types.ADD_OPTIONAL_ATTRIBUTE,
    attribute: {
      predicate,
      object,
      scope: 'can-access',
      provenance: {
        source: 'wallet',
      },
      subject: walletId,
    },
  };
}

export function saveAttributes(dateOfBirth, district, walletId, setItemAsync) {
  return async (dispatch) => {
    if (dateOfBirth) {
      dispatch(addOptionalAttribute('schema:dateOfBirth', dateOfBirth, walletId));
    }
    if (district) {
      dispatch(addOptionalAttribute('schema:district', district, walletId));
    }
    await dispatch(storeCredentials(setItemAsync));
    dispatch(goToAttributesLanding());
    return dispatch({
      type: types.SAVE_ATTRIBUTES,
      dateOfBirth,
      district,
    });
  };
}

export function saveDistrict(district) {
  return async dispatch => dispatch({
    type: types.SAVE_DISTRICT,
    district,
  });
}

export function saveDateOfBirth(dateOfBirth, walletId, setItemAsync) {
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
    dispatch({
      type: types.RESET_DATE_OF_BIRTH_ERRORS,
    });

    if (!dateOfBirth) {
      return dispatch({
        type: types.EMPTY_DATE_OF_BIRTH_ERROR,
      });
    }

    try {
      dispatch(addOptionalAttributeAction);
      await dispatch(storeCredentials(setItemAsync));
      dispatch(goToAttributesLanding());
      return dispatch(saveDateOfBirthAction);
    } catch (error) {
      return dispatch({
        type: types.SAVE_DATE_OF_BIRTH_ERROR,
      });
    }
  };
}

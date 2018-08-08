import urlParse from 'url-parse';
import types from '../actionTypes';
import { goToAttributesLanding } from './navigation';
import { refreshPetitionAttributes } from './petition';


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
  return async (dispatch, getState) => {
    const state = getState();
    await dispatch(addCredentialFromUrl(attribute, walletId, url));
    const action = await dispatch(storeCredentials(setItemAsync));
    await dispatch(refreshPetitionAttributes(state.attributes.list));

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

    dispatch(addOptionalAttributeAction);
    await dispatch(storeCredentials(setItemAsync));
    dispatch(goToAttributesLanding());
    return dispatch(saveDateOfBirthAction);
  };
}

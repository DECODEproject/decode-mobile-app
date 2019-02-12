import types from '../actionTypes';
import { goToAttributesLanding } from './navigation';


export function addCredentialFromObject(attribute, walletId, credential) {
  return {
    type: types.ADD_CREDENTIAL,
    attribute,
    walletId,
    credential,
  };
}

export function storeCredentials(setItemAsync) {
  return (dispatch, getState) => {
    const state = getState();
    console.log(`Saving attributes: ${JSON.stringify([...state.attributes.list.values()])}`);
    return setItemAsync('attributes', JSON.stringify([...state.attributes.list.values()])).then(() => (
      dispatch({
        type: types.STORE_ATTRIBUTES,
        attributes: state.attributes.list,
      })
    ));
  };
}

export function addCredential(attribute, walletId, credential, setItemAsync) {
  return async (dispatch) => {
    console.log(`attribute: ${JSON.stringify(attribute)}, wallet id: ${walletId}, credential: ${JSON.stringify(credential)}`);
    await dispatch(addCredentialFromObject(attribute, walletId, credential));
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

export function saveAttributes(dateOfBirth, district, gender, walletId, setItemAsync) {
  return async (dispatch) => {
    dispatch({
      type: types.RESET_ATTRIBUTES_ERRORS,
    });

    try {
      if (dateOfBirth) {
        dispatch(addOptionalAttribute('schema:dateOfBirth', dateOfBirth, walletId));
      }
      if (district) {
        dispatch(addOptionalAttribute('schema:district', district, walletId));
      }
      if (gender) {
        dispatch(addOptionalAttribute('schema:gender', gender, walletId));
      }
      await dispatch(storeCredentials(setItemAsync));
      dispatch(goToAttributesLanding());
      return dispatch({
        type: types.SAVE_ATTRIBUTES,
        dateOfBirth,
        district,
      });
    } catch (error) {
      return dispatch({
        type: types.SAVE_ATTRIBUTES_ERROR,
      });
    }
  };
}

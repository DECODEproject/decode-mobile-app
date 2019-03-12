/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

import types from '../actionTypes';
import {addTranslations} from "../../../i18n";


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
    addTranslations('schema', attribute.predicate, attribute.name);
    await dispatch(addCredentialFromObject(attribute, walletId, credential));
    const action = await dispatch(storeCredentials(setItemAsync));
    return action;
  };
}

export function loadCredentials(getItemAsync) {
  return (dispatch) => {
    getItemAsync('attributes').then((attributes) => {
      let parsedAttributes = attributes ? JSON.parse(attributes) : [];
      let attributeMap = new Map();
      for (const attr of parsedAttributes) {
        attributeMap.set(attr.predicate, attr);
        if (attr.name) {
          addTranslations('schema', attr.predicate, attr.name);
        }
      }
      dispatch({
        type: types.LOAD_ATTRIBUTES,
        attributes: attributeMap,
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

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

const initialState = {
  list: new Map(),
  errorSaveAttributes: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CREDENTIAL: {
      const newAttribute = {
        predicate: action.attribute.predicate,
        object: action.attribute.object,
        scope: action.attribute.scope,
        provenance: {
          source: action.attribute.provenance.url,
          id: action.issuerId,
          verify: action.issuerVerifier,
          credential: action.credential,
          blindProof: action.blindProof,
        },
        subject: action.uniqueId,
        name: action.attribute.name,
      };
      state.list.delete('oogh1seG'); // TODO: remove this in a future version
      return {
        ...state,
        list: state.list.set(newAttribute.predicate, newAttribute),
      };
    }
    case types.LOAD_ATTRIBUTES:
      return {
        ...state,
        list: action.attributes,
      };
    case types.ADD_OPTIONAL_ATTRIBUTE:
      return {
        ...state,
        list: state.list.set(action.attribute.predicate, action.attribute),
      };
    case types.SAVE_ATTRIBUTES_ERROR:
      return {
        ...state,
        errorSaveAttributes: true,
      };
    case types.RESET_ATTRIBUTES_ERRORS:
      return {
        ...state,
        errorSaveAttributes: false,
      };
    default:
      return state;
  }
}

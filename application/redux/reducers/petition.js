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
  loaded: false,
  petition: {},
  error: undefined,
  signed: false,
  enabledAttributes: [],
};


const getAttributeIndex = (attr, list) => (
  list.findIndex(listAttr => listAttr.predicate === attr.predicate));

const toggleElementsInList = (element, list) => {
  const indexOfElement = getAttributeIndex(element, list);
  if (indexOfElement !== -1) {
    list.splice(indexOfElement, 1);
  } else {
    list.push(element);
  }
  return list.slice(0);
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_PETITION: {
      const { petition } = action;
      return {
        ...state,
        loaded: true,
        petition,
        error: undefined,
      };
    }
    case types.SET_PETITION_ERROR:
      return {
        ...state,
        loaded: false,
        petition: {},
        error: action.error,
      };
    case types.SIGN_PETITION:
      return {
        ...state,
        signed: true,
        error: undefined,
      };
    case types.SIGN_PETITION_ERROR:
      return {
        ...state,
        signed: false,
        error: action.error,
      };
    case types.TOGGLE_ENABLE_ATTRIBUTE:
      return {
        ...state,
        enabledAttributes: toggleElementsInList(action.attribute, state.enabledAttributes),
      };
    default:
      return state;
  }
}

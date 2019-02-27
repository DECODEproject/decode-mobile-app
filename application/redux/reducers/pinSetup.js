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
  pin1: '',
  pin2: '',
  validEqual: true,
  validFormat: true,
  valid: true,
};

const isPinEqual = (p, q) => p === q;
const isAtleast4Digits = p => p.length >= 4;
const isAllNumbers = p => p.match(/\D/) === null;

const isValidPin = pin1 =>
  isAtleast4Digits(pin1) &&
  isAllNumbers(pin1);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.PIN_SETUP_TEXT1_CHANGED:
      return {
        ...state,
        pin1: action.pin,
      };
    case types.PIN_SETUP_TEXT2_CHANGED:
      return {
        ...state,
        pin2: action.pin,
      };
    case types.PIN_SETUP_VALIDATE:
      return {
        ...state,
        validFormat: isValidPin(state.pin1),
        validEqual: isPinEqual(state.pin1, state.pin2),
        valid: isValidPin(state.pin1) && isPinEqual(state.pin1, state.pin2),
      };
    case types.RESET_PIN_SETUP:
      return initialState;
    default:
      return state;
  }
}

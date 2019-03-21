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
  authorized: false,
  pin: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHORIZATION_ACTION:
      return {
        ...state,
        authorized: action.pinCorrect,
      };
    case types.UPDATE_PIN_ACTION:
      return {
        ...state,
        pin: action.pin,
      };
    case types.RESET_PIN_ACTION:
      return {
        ...state,
        pin: initialState.pin,
      };
    default:
      return state;
  }
};

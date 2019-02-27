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

import { Keyboard } from 'react-native';
import types from '../actionTypes';
import { storePinInPhone } from '../../../LocalStorage';
import { goToHome } from './navigation';

export function changeText1(pin) {
  return {
    type: types.PIN_SETUP_TEXT1_CHANGED,
    pin,
  };
}

export function changeText2(pin) {
  return {
    type: types.PIN_SETUP_TEXT2_CHANGED,
    pin,
  };
}

export function validate() {
  return {
    type: types.PIN_SETUP_VALIDATE,
  };
}

export function resetPinSetup() {
  return {
    type: types.RESET_PIN_SETUP,
  };
}

export function storePin(setItem, pin) {
  return async (dispatch, getState) => {
    await dispatch(validate());

    const { pinSetup: { valid } } = getState();

    if (valid) {
      await storePinInPhone(setItem, pin);
      Keyboard.dismiss();
      dispatch(resetPinSetup());
      dispatch(goToHome());
    }
  };
}

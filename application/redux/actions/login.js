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
import { isComingFromLogin, getLoginParameters } from '../../../lib/entryPoint';

export function checkComingFromLogin() {
  return dispatch => isComingFromLogin().then((result) => {
    const comingFromLoginAction = {
      type: types.COMING_FROM_LOGIN,
    };
    const notComingFromLoginAction = {
      type: types.NOT_COMING_FROM_LOGIN,
    };
    return result ? dispatch(comingFromLoginAction) : dispatch(notComingFromLoginAction);
  });
}

export function doLogin(loginRequest, callback, sessionId, credential, attributes, fail=false) {
  return async (dispatch) => {
    const { callback: initialCallback, sessionId: initialessionId} = await getLoginParameters();
    const loginResponse = await loginRequest(
      callback || initialCallback,
      sessionId || initialessionId,
      credential,
      attributes,
      fail,
      );
    if (loginResponse.status === 200) {
      dispatch({type: types.LOGIN_SUCCEEDED});
    } else {
      dispatch({
        type: types.LOGIN_FAILED,
        code: loginResponse.status,
        reason: loginResponse.message,
      });
    }
  };
}

export function initLogin() {
  return dispatch => {
    dispatch({type: types.LOGIN_RESET});
  };
}

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
  loading: false,
  isComingFromDevice: false,
  editingName: true,
  configStep: 1,
  communities: [],
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case types.COMING_FROM_DEVICE:
      const {device} = action;
      return {
        ...state,
        isComingFromDevice: true,
        device,
      };
    case types.NOT_COMING_FROM_DEVICE:
      return {
        ...state,
        isComingFromDevice: false,
      };
    case types.UPDATE_DEVICE_NAME:
      const { name } = action;
      return {
        ...state,
        name,
      };
    case types.SAVE_DEVICE_NAME:
      return {
        ...state,
        editingName: false,
      };
    case types.SET_DEVICE_CONFIG_STEP:
      const { step } = action;
      return {
        ...state,
        configStep: step,
      };
    case types.LIST_COMMUNITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined,
        communities: [],
      };
    case types.LIST_COMMUNITIES_SUCCESS:
      const {communities: {policies}} = action;
      return {
        ...state,
        loading: false,
        communities: policies,
      };
    case types.LIST_COMMUNITIES_FAILURE:
      const { error } = action;
      return {
        ...state,
        loading: false,
        error,
      };
    default:
      return state;
  }
}
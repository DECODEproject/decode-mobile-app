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

import { NavigationActions } from '@expo/ex-navigation';
import Router from '../../../Router';
import types from "../actionTypes";

export function resetNavigation() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    NavigationActions.popToTop(navigatorUID);
    const action = NavigationActions.replace(navigatorUID, Router.getRoute('walkthrough'));
    dispatch(action);
  };
}

export function goToPetitionSummary(top = true) {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const route = Router.getRoute('petitionSummary', { petitionId: getState().petition.petition.id });
    if (top) NavigationActions.popToTop(navigatorUID);
    const action = top ? NavigationActions.replace(navigatorUID, route) : NavigationActions.push(navigatorUID, route);
    dispatch(action);
  };
}

export function goToAttributesVerification() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const route = Router.getRoute('attributesVerification', { petitionId: getState().petition.petition.id });
    const action = NavigationActions.push(navigatorUID, route);
    dispatch(action);
  };
}

export function goToAttributesSummary(top = true) {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const route = Router.getRoute('attributesSummary', { petitionId: getState().petition.petition.id });
    if (top) NavigationActions.popToTop(navigatorUID);
    const action = top ? NavigationActions.replace(navigatorUID, route) : NavigationActions.push(navigatorUID, route);
    dispatch(action);
  };
}

export function goToAttributesLanding() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('attributesLanding'));
    dispatch(action);
  };
}

export function goToSignOutcome() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('signOutcome'));
    dispatch(action);
  };
}

export function goToPinSetup() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('pinSetup'));
    dispatch(action);
  };
}

export function goToHome() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('home'));
    dispatch(action);
  };
}

export function goToPilotScreen() {
  return (dispatch, getState) => {
    const link = getState().decidimInfo.decidimAPIUrl;
    if (link) {
      dispatch(goToAttributesSummary());
    } else {
      dispatch(goToAttributesLanding());
    }
  };
}

export function goToNewAttributes() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('manageAttributes'));
    dispatch(action);
  };
}

export function goToError(message) {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('error', { message }));
    dispatch(action);
  };
}

export function goToLogin(bcnnowUrl, sessionId) {
  return (dispatch, getState) => {
    const {
      navigation: {currentNavigatorUID: navigatorUID, navigators},
      authorization: {authorized}
    } = getState();
    const {index, routes} = navigators[navigatorUID];
    const routeName = routes[index].routeName;
    dispatch({
      type: types.COMING_FROM_LOGIN,
      bcnnowUrl,
      sessionId,
    });
    if (routeName === 'home' && ! authorized) {
      return;
    }
    NavigationActions.popToTop(navigatorUID);
    const action = NavigationActions.replace(navigatorUID, Router.getRoute('login', { bcnnowUrl, sessionId }));
    dispatch(action);
  };
}

export function goBack() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.pop(navigatorUID);
    dispatch(action);
  };
}

export function goToPetitionList() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('petitionList'));
    dispatch(action);
  };
}

export function goToDevice(device) {
  return (dispatch, getState) => {
    const {
      navigation: {currentNavigatorUID: navigatorUID, navigators},
      authorization: {authorized}
    } = getState();
    const {index, routes} = navigators[navigatorUID];
    const routeName = routes[index].routeName;
    dispatch({
      type: types.COMING_FROM_DEVICE,
      device,
    });
    if (routeName === 'home' && ! authorized) {
      return;
    }
    const action = NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute('device')], 0);
    dispatch(action);
  };
}

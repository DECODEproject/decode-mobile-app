import { NavigationActions } from '@expo/ex-navigation';
import Router from '../../../Router';

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

export function goToError() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('error'));
    dispatch(action);
  };
}

export function goToLogin(bcnnowUrl, sessionId) {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
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

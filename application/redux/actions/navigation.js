import { NavigationActions } from '@expo/ex-navigation';
import Router from '../../../Router';

export function goToAuthorization(petitionLink) {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const route = Router.getRoute('authorisation', { petitionLink });
    const action = NavigationActions.push(navigatorUID, route);
    dispatch(action);
  };
}

export function goToQRScanner() {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const action = NavigationActions.push(navigatorUID, Router.getRoute('QRScanner'));
    dispatch(action);
  };
}

export function goToPetitionSummary(petitionLink) {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const route = Router.getRoute('petitionSummary', { petitionLink });
    const action = NavigationActions.push(navigatorUID, route);
    dispatch(action);
  };
}

export function goToAttributesSummary(petitionLink) {
  return (dispatch, getState) => {
    const navigatorUID = getState().navigation.currentNavigatorUID;
    const route = Router.getRoute('attributesSummary', { petitionLink });
    const action = NavigationActions.push(navigatorUID, route);
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
    const link = getState().petitionLink.petitionLink;
    if (link) {
      dispatch(goToAttributesSummary(link));
    } else {
      dispatch(goToAttributesLanding());
    }
  };
}

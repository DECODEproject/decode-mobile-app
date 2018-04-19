import { NavigationActions } from '@expo/ex-navigation';
import Store from '../store';
import Router from '../../../Router';

export function goQRScannerIntro() {
  const navigatorUID = Store.getState().navigation.currentNavigatorUID;
  return NavigationActions.push(navigatorUID, Router.getRoute('QRScannerIntro'));
}

export function goToAuthorization(petitionLink) {
  const navigatorUID = Store.getState().navigation.currentNavigatorUID;
  const route = Router.getRoute('authorisation', { petitionLink });
  return NavigationActions.push(navigatorUID, route);
}

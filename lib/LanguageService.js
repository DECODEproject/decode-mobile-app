import Expo from 'expo';

export default class LanguageService {
  getLocale() { // eslint-disable-line
    return Expo.DangerZone.Localization.getCurrentLocaleAsync().then((lng) => { lng.replace('_', '-'); });
  }

  getLanguage() {
    return this.getLocale().then(locale => locale.split('-')[0]);
  }
}

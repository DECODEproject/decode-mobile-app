import { Localization } from 'expo-localization';

export default class LanguageService {
  getLocale() {
    return Localization.locale;
  }

  getLanguage() {
    return this.getLocale().split('-')[0];
  }
}

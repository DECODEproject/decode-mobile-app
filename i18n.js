import i18n from 'i18next';
import { Localization } from 'expo-localization';
import es from './translations/es';
import ca from './translations/ca';
import en from './translations/en';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  detect: () => Localization.locale,
  init: Function.prototype,
  cacheUserLanguage: Function.prototype,
};

i18n
  .use(languageDetector)
  .init({
    fallbackLng: 'es',

    resources: {
      es,
      ca,
      en,
    },
  });

export const getLanguage = () => i18n.language.split('-')[0];
export const addTranslation = (lang, bundle, key, value) => i18n.addResource(lang, bundle, key, value);

export default i18n;

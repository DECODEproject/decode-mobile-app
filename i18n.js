import i18n from 'i18next';
import Expo from 'expo';
import es from './translations/es';
import ca from './translations/ca';
import en from './translations/en';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: callback => /* 'en'; */ Expo.DangerZone.Localization.getCurrentLocaleAsync().then((lng) => { callback(lng.replace('_', '-')); }),
  init: () => {},
  cacheUserLanguage: () => {},
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


export default i18n;

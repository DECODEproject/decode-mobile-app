import i18n from 'i18next';
import Expo from 'expo';
import home from './translations/home';
import walkthrough from './translations/walkthrough';

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
      es: {
        home: home.es,
        walkthrough: walkthrough.es,
      },
      ca: {
        home: home.ca,
        walkthrough: walkthrough.ca,
      },
      en: {
        home: home.en,
        walkthrough: walkthrough.en,
      },
    },
  });


export default i18n;

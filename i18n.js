import i18n from 'i18next';
import Expo from 'expo';
import home from './translations/home';
import walkthrough from './translations/walkthrough';
import pinSetup from './translations/pinSetup';
import attributesSummary from './translations/attributesSummary';

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
        pinSetup: pinSetup.es,
        attributesSummary: attributesSummary.es,
      },
      ca: {
        home: home.ca,
        walkthrough: walkthrough.ca,
        pinSetup: pinSetup.ca,
        attributesSummary: attributesSummary.ca,
      },
      en: {
        home: home.en,
        walkthrough: walkthrough.en,
        pinSetup: pinSetup.en,
        attributesSummary: attributesSummary.en,
      },
    },
  });


export default i18n;

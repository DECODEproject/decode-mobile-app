import i18n from 'i18next';
import Expo from 'expo';

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
        walkthrough: {
          skip: 'Saltar',
          next: 'Siguiente',
          pages: {
            one: {
              title: 'DECODE',
              subtitle: 'Devuelve el control de tus datos personales',
            },
            two: {
              subtitle: 'Las grandes corporaciones venden tus datos',
            },
            three: {
              title: 'DECODE',
              subtitle: 'Te devuelve el control de tus datos, se almazenan en la wallet',
            },
            four: {
              subtitle: 'Tus datos estan protegidos',
            },
          },
        },
      },
      ca: {
        walkthrough: {
          skip: 'Salta',
          next: 'Següent',
          pages: {
            one: {
              title: 'DECODE',
              subtitle: 'Et torna el control de les teves dades personals',
            },
            two: {
              subtitle: 'Las grans corporacions venen les teves dades',
            },
            three: {
              title: 'DECODE',
              subtitle: 'Et retorna el control de les teves dades, estan enmagatzamades a la wallet',
            },
            four: {
              subtitle: 'Les tevas dades estan protegides',
            },
          },
        },
      },
      en: {
        walkthrough: {
          skip: 'Skip',
          next: 'Next',
          pages: {
            one: {
              title: 'DECODE',
              subtitle: 'Gives you ownership of your personal data',
            },
            two: {
              subtitle: 'Big companies store and sell your data',
            },
            three: {
              title: 'DECODE',
              subtitle: 'Gives you back control of your data. It is kept in your wallet',
            },
            four: {
              subtitle: 'Your data is protected',
            },
          },
        },
      },
    },
  });


export default i18n;

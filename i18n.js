/*
 * DECODE App – A mobile app to control your personal data
 * Copyright (C) 2019 – Thoughtworks Ltd.
 * Copyright (C) 2019 – DRIBIA Data Research S.L.
 *
 * DECODE App is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DECODE App is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * email: ula@dribia.com
 */

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
export const addTranslations = (bundle, key, values) => {
  for (const lang in values) {
    i18n.addResource(lang, bundle, key, values[lang]);
  }
};

export default i18n;

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

import urlParse from 'url-parse';
import DecidimClient from "./DecidimClient";
import LanguageService from "./LanguageService";

export default (goToPetition, goToLogin, goToDevice) => event => {
    const { url } = event;
    console.log(`Received linking event: ${url}`);
    const urlObj = urlParse(url, true);
    // Try to interpret as petition signing request
    const { query: { decidimAPIUrl, petitionId } } = urlObj;
    if (decidimAPIUrl && petitionId) {
      const dddc = new DecidimClient(new LanguageService(), decidimAPIUrl);
      goToPetition(dddc, petitionId);
      return;
    }
    // Try to interpret as login request
    const { query: { callback, sessionId }, hostname: action } = urlObj;
    if (action === 'login') {
      console.log("Going to login", callback);
      goToLogin(callback, sessionId);
      return;
    }
    // Try to interpret as device onboarding request
    if (action === 'iot-device') {
      const { query: { token, lat, lng, exposure } } = urlObj;
      console.log('Going to device onboarding: ', token, lat, lng, exposure);
      goToDevice({token, location: {lat, lng}, exposure});
      return;
    }

};

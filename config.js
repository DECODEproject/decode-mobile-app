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

import { Constants } from 'expo';
import urlParse from 'url-parse';

export default function getChainspaceUrl(environment) {
  const chainspaceUrl = {
    dev: 'http://localhost:5000',
    production: 'http://ec2-34-241-214-92.eu-west-1.compute.amazonaws.com:9090',
  };

  let hostName = urlParse(Constants.linkingUri, true).hostname;
  if (!hostName) {
      hostName = urlParse(Constants.experienceUrl, true).hostname;
  }
  chainspaceUrl.dev = chainspaceUrl.dev.replace('localhost', hostName);
  console.log(`Expo Constants: ${JSON.stringify(Constants)}`);
  return environment === 'production' ? chainspaceUrl.production : chainspaceUrl.dev;
}

export function getDecidimUrl() {
  return 'https://dddc.decodeproject.eu';
}

export function getBcnnowUrl() {
  return 'http://bcnnow.decodeproject.eu';
}

export const policyStoreHost = 'https://policystore.decodeproject.eu';

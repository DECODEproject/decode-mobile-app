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

import {policyStoreHost} from '../config';
import isJson from '../lib/is-json';

const LIST_COMMUNITIES_ENDPOINT =
  `${policyStoreHost}/twirp/decode.iot.policystore.PolicyStore/ListEntitlementPolicies`;

const throwError = async (response) => {
  const {status} = response;
  const text = await response.text();
  if (isJson(text)) {
    const {code, msg} = JSON.parse(text);
    throw new Error(`${status}, code ${code}, message '${msg}' `);
  } else {
    throw new Error(text);
  }
};

export const listCommunities = async () => {
  console.log("Going to call policy store: ", LIST_COMMUNITIES_ENDPOINT);
  const response = await fetch(LIST_COMMUNITIES_ENDPOINT, {
    method: 'POST',
    body: '{}',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (response.ok) return await response.json();
  await throwError(response);
};

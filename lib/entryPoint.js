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
import getInitialUrl from '../application/utils/url';


export async function isComingFromLogin() {
  return getInitialUrl().then((rawUrl) => {
    const url = urlParse(rawUrl, true);
    const { query: { action } } = url;
    return action === 'login';
  });
}

export async function getLoginParameters() {
  return getInitialUrl().then((rawUrl) => {
    const url = urlParse(rawUrl, true);
    const { query: { callback, sessionId } } = url;
    return { callback, sessionId };
  });
}

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

/* eslint-disable */

const { Buffer } = require('buffer');

const getRandomValues = (byteArray) => {
  for (let i = 0; i < byteArray.length; i = i + 1) {
    byteArray[i] = Math.floor(256 * Math.random());
  }
};
const randomBytes = (size, cb) => {
  // phantomjs needs to throw
  if (size > 65536) throw new Error('requested too many random bytes');
  // in case browserify  isn't using the Uint8Array version
  const rawBytes = new global.Uint8Array(size);

  // This will not work in older browsers.
  // See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
  if (size > 0) { // getRandomValues fails on IE if size == 0
    getRandomValues(rawBytes);
  }
  // XXX: phantomjs doesn't like a buffer being passed here
  const bytes = Buffer.from(rawBytes.buffer);

  if (cb) {
    cb(bytes);
  }
  return bytes;
};
module.exports = { randomBytes };

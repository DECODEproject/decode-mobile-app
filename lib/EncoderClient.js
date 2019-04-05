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

import {encoderHost} from '../config';
import {throwError} from './errors/utils';

const CREATE_STREAM_ENDPOINT =
  `${encoderHost}/twirp/decode.iot.encoder.Encoder/CreateStream`;

export const createStream = async (device, community) => {
  console.log("Going to call policy store: ", CREATE_STREAM_ENDPOINT);
  console.log("Device: ", device);
  console.log("Community: ", community);
  const jsonBody = {
    device_token: device.token,
    community_id: community.community_id,
    recipient_public_key: community.public_key,
    location: {
      latitude: device.location.lat,
      longitude: device.location.lng,
    },
    exposure: device.exposure,
    operations: community.operations,
  };
  const response = await fetch(CREATE_STREAM_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(jsonBody),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (response.ok) return await response.json();
  await throwError(response);
};

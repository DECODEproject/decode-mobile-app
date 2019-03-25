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

import axios from 'axios';

const request = async (callback, sessionId, credential, attributes, fail=false) => {
  const blindProofObject = JSON.parse(credential.provenance.blindProof);
  const data = {
    sessionId,
    credential: {
      authorizable_attribute_id: credential.predicate,
      value: { proof: blindProofObject.proof },
      credential_issuer_endpoint_address: credential.provenance.source,
    },
    optionalAttributes: attributes.map(attr => ({
      attribute_id: attr.predicate,
      value: attr.object,
    })),
  };

  try {
    console.log("Callback: ", callback);
    console.log("Session id: ", sessionId);
    console.log("Credential: ", credential);
    console.log("Attributes: ", attributes);
    console.log("JSON data: ", data);
    const response = await axios.post(callback, data);
    const {data: responseData} = response;
    console.log("Response from login: ", responseData);
    return response;
  } catch (error) {
    const {response: {status, data: {message}}} = error;
    console.log("Error from login: ", status, message);
    if (fail) return {...error, status: 408, message: 'timeout'};
    return error;
  }
};

export default request;

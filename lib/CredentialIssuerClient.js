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
import CredentialIssuerError from './errors/CredentialIssuerError';

class CredentialIssuerClient {
  constructor(url) {
    this.url = url;
  }

  async issueCredential(authorizableAttributeId, blindSignRequest, data) {
    let response;
    let values = [];
    try {
      for (const k in data) {
        values.push({
          name: k,
          value: data[k],
        });
      }
      const jsonBody = {
        authorizable_attribute_id: authorizableAttributeId,
        blind_sign_request: blindSignRequest,
        values,
      };
      console.log("Going to call: ", this.url);
      console.log("JSON body: ", jsonBody);
      response = await axios.post(this.url, jsonBody);
      return {
        "credential": response,
      }
    } catch (error) {
      throw new CredentialIssuerError(`Error calling credential issuer: ${error}`);
    }
  }
}

export default CredentialIssuerClient;

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
import FetchPetitionError from './errors/FetchPetitionError';
import Petition from './Petition';
import PetitionNotFoundError from './errors/PetitionNotFoundError';

class DecidimClient {
  constructor(languageService, decidimAPIUrl) {
    this.languageService = languageService;
    this.decidimAPIUrl = decidimAPIUrl;
  }

  async fetchPetition(petitionId) {
    const language = this.languageService.getLanguage();

    const graphQlQuery = `{
      petition(id: "${petitionId}") {
        id
        title
        description
        json_schema
        attribute_id
      }
    }`.replace(/\n/g, '');

    let response;
    try {
      ({ data: { data: response } } = await axios.post(this.decidimAPIUrl, {
        query: graphQlQuery,
      }));
    } catch (error) {
      throw new FetchPetitionError();
    }

    if (!response) {
      throw new PetitionNotFoundError();
    }

    const petitionResult = {
      petition: new Petition(response.petition, language).toJSON(),
    };

    return petitionResult;
  }
}

export default DecidimClient;

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

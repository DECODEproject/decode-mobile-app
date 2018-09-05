import axios from 'axios';
import FetchPetitionError from './errors/FetchPetitionError';
import Petition from './Petition';
import PetitionNotFoundError from './errors/PetitionNotFoundError';

class DecidimClient {
  constructor(languageService, decidimAPIUrl) {
    this.languageService = languageService;
    this.decidimAPIUrl = decidimAPIUrl;
  }

  getParticipatoryProcess(graphQlQuery) {
    return axios.post(this.decidimAPIUrl, {
      query: graphQlQuery,
    });
  }

  async fetchPetition(petitionId) {
    const language = await this.languageService.getLanguage();

    const graphQlQuery = `{
      participatoryProcess(id: ${petitionId}) {
        id
        title {
          translation (locale: "${language}")
        }
      }
    }`.replace(/\n/g, '');

    let response;
    try {
      ({ data: { data: response } } = await this.getParticipatoryProcess(graphQlQuery));
    } catch (error) {
      throw new FetchPetitionError();
    }

    if (!response.participatoryProcess) {
      throw new PetitionNotFoundError();
    }

    const petitionResult = {
      petition: new Petition(response.participatoryProcess).toJSON(),
    };

    return petitionResult;
  }
}

export default DecidimClient;

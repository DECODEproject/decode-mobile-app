import axios from 'axios';
import FetchPetitionError from './errors/FetchPetitionError';
import Petition from './Petition';
import PetitionNotFoundError from './errors/PetitionNotFoundError';

class DecidimClient {
  constructor(languageService) {
    this.languageService = languageService;
  }

  async fetchPetition(decidimApiUrl, petitionId) {
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
      ({ data: { data: response } } = await axios.post(decidimApiUrl, {
        query: graphQlQuery,
      }));
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

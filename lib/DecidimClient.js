import FetchPetitionError from './errors/FetchPetitionError';
import Petition from './Petition';

class DecidimClient {
  constructor(languageService) {
    this.languageService = languageService;
  }

  async fetchPetition(petitionLink, petitionId) {
    let response;
    const language = await this.languageService.getLanguage();
    try {
      const graphQlQuery = `${petitionLink}
        query={
          participatoryProcess(id: ${petitionId}) {
            id
            title {
              translation (locale: "${language}")
            }
          }
        }
      `;
      response = await fetch(graphQlQuery);
    } catch (error) {
      throw new FetchPetitionError(error.message);
    }

    if (!response.ok) {
      const text = await response.text();
      throw new FetchPetitionError(text);
    }

    const { data } = await response.json();
    const petitionResult = {
      petition: new Petition(data.participatoryProcess).toJSON(),
    };

    return petitionResult;
  }
}

export default DecidimClient;

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
      return {
        error,
        message: 'Could not retrieve petition details.',
      };
    }

    if (!response.ok) {
      let text = await response.text();
      if (!text) text = 'Unknown error';
      return { error: response.status, message: text };
    }

    const { data } = await response.json();
    const petitionResult = {
      petition: new Petition(data.participatoryProcess).toJSON(),
    };

    return petitionResult;
  }
}

export default DecidimClient;

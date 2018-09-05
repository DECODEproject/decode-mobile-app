import DecidimClient from '../../lib/DecidimClient';
import LanguageService from '../../lib/LanguageService';

describe('Decidim API', () => {
  const MOCK_SERVER_URL = '127.0.0.1';
  const petitionId = '2';
  const language = 'es';

  const VALID_RESPONSE = {
    petition: {
      id: petitionId,
      attributes: {
        mandatory: [{
          predicate: 'schema:addressLocality',
          object: 'Barcelona',
          scope: 'can-access',
          credentialIssuer: {
            url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
          },
        }],
        optional: [],
      },
    },
  };

  describe('Participatory Processes', () => {
    const graphQlQuery = `{
      participatoryProcess(id: ${petitionId}) {
        id
        title {
          translation (locale: "${language}")
        }
      }
    }`.replace(/\n/g, '');

    beforeAll((done) => {
      const decidimInteraction = {
        state: 'I have a participatory process',
        uponReceiving: 'a request for information of a participatory process',
        withRequest: {
          method: 'POST',
          path: '/',
          data: { query: graphQlQuery },
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: VALID_RESPONSE,
        },
      };

      global.provider.addInteraction(decidimInteraction)
        .then(() => done());
    });


    it('should return participatory process/petition information from Decidim', (done) => {
      const languageService = new LanguageService();
      languageService.getLanguage = () => language;
      const decidimAPIUrl = `http://${MOCK_SERVER_URL}:${global.port}`;
      const decidimClient = new DecidimClient(languageService, decidimAPIUrl);

      return decidimClient.getParticipatoryProcess(graphQlQuery).then((response) => {
        expect(response.data.petition.id).toEqual(petitionId);
        done();
      });
    });
  });
});

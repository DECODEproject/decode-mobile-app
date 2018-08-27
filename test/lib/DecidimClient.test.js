import fetchMock from 'fetch-mock';
import DecidimClient from '../../lib/DecidimClient';
import LanguageService from '../../lib/LanguageService';
import FetchPetitionError from '../../lib/errors/FetchPetitionError';

describe('Decidim Client', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  const getLanguageServiceMock = (language = 'ca') => {
    const languageService = new LanguageService();
    languageService.getLanguage = () => language;
    return languageService;
  };

  describe('fetch petition data', () => {
    const petitionLink = 'petitions';
    const petitionId = '2';
    const petitionFromDecidim = {
      data: {
        participatoryProcess: {
          id: petitionId,
          title: {
            translation: "Pla d'Actuació Municipal",
          },
        },
      },
    };
    const decidimClient = new DecidimClient(getLanguageServiceMock());

    const expectedPetition = {
      petition: {
        id: petitionId,
        title: petitionFromDecidim.data.participatoryProcess.title.translation,
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

    const graphQlQuery = `${petitionLink}
        query={
          participatoryProcess(id: ${petitionId}) {
            id
            title {
              translation (locale: "ca")
            }
          }
        }
      `;
    it('should return the petition from Decidim API', async () => {
      fetchMock.getOnce(graphQlQuery, petitionFromDecidim);
      const actualPetition = await decidimClient.fetchPetition(petitionLink, petitionId);

      expect(actualPetition).toEqual(expectedPetition);
    });

    it('should return an error if there is a problem fetching from Decidim', async () => {
      fetchMock.getOnce(graphQlQuery, Promise.reject(new Error('Failed Fetch')));

      await expect(decidimClient.fetchPetition(petitionLink, petitionId))
        .rejects.toThrow(FetchPetitionError);
    });

    it('should return an error if fetch was successful but returns not 200', async () => {
      const errorResponse403 = {
        status: 403,
        body: '',
      };
      fetchMock.getOnce(graphQlQuery, errorResponse403);
      await expect(decidimClient.fetchPetition(petitionLink, petitionId))
        .rejects.toThrow(FetchPetitionError);
    });

    it('should request the petition data with the appropriate language', async () => {
      const graphQlQueryForSpanish = `${petitionLink}
        query={
          participatoryProcess(id: ${petitionId}) {
            id
            title {
              translation (locale: "es")
            }
          }
        }
      `;
      fetchMock.get(graphQlQueryForSpanish, petitionFromDecidim);

      const languageServiceForSpanish = getLanguageServiceMock('es');
      await new DecidimClient(languageServiceForSpanish).fetchPetition(petitionLink, petitionId);

      expect(fetchMock.done(fetchMock.MATCHED)).toEqual(true);
    });
  });
});

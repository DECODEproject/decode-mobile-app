import axios from 'axios';
import DecidimClient from '../../lib/DecidimClient';
import LanguageService from '../../lib/LanguageService';
import FetchPetitionError from '../../lib/errors/FetchPetitionError';
import PetitionNotFoundError from '../../lib/errors/PetitionNotFoundError';

jest.mock('axios');

describe('Decidim Client', () => {
  const getLanguageServiceMock = (language = 'ca') => {
    const languageService = new LanguageService();
    languageService.getLanguage = () => language;
    return languageService;
  };

  describe('fetch petition data', () => {
    const decidimApiUrl = 'decidim.api.com';
    const petitionId = '2';
    const petitionFromDecidim = {
      data: {
        data: {
          participatoryProcess: {
            id: petitionId,
            title: {
              translation: "Pla d'Actuació Municipal",
            },
          },
        },
      },
    };
    const decidimClient = new DecidimClient(getLanguageServiceMock());

    const expectedPetition = {
      petition: {
        id: petitionId,
        title: petitionFromDecidim.data.data.participatoryProcess.title.translation,
        attributes: {
          mandatory: [{
            predicate: 'schema:addressLocality',
            object: 'Barcelona',
            scope: 'can-access',
            provenance: {
              url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
            },
          }],
          optional: [],
        },
      },
    };

    const requestQuery = `{
      participatoryProcess(id: ${petitionId}) {
        id
        title {
          translation (locale: "ca")
        }
      }
    }`.replace(/\n/g, '');
    const requestBody = { query: requestQuery };

    const requestQueryForSpanish = `{
      participatoryProcess(id: ${petitionId}) {
        id
        title {
          translation (locale: "es")
        }
      }
    }`.replace(/\n/g, '');
    const requestBodyForSpanish = { query: requestQueryForSpanish };

    it('should return the petition from Decidim API', async () => {
      axios.post.mockResolvedValue(petitionFromDecidim);
      const actualPetition = await decidimClient.fetchPetition(decidimApiUrl, petitionId);

      expect(actualPetition).toEqual(expectedPetition);
      expect(axios.post).toBeCalledWith(decidimApiUrl, requestBody);
    });

    it('should return an error if there is a problem fetching from Decidim', async () => {
      axios.post.mockRejectedValue(new Error('Failed post'));

      await expect(decidimClient.fetchPetition(decidimApiUrl, petitionId))
        .rejects.toThrow(FetchPetitionError);
      expect(axios.post).toBeCalledWith(decidimApiUrl, requestBody);
    });

    it('should return an error if fetch was successful but petition does not exist', async () => {
      const errorResponse = {
        data: {
          data: {
            participatoryProcess: null,
          },
        },
      };
      axios.post.mockResolvedValue(errorResponse);

      await expect(decidimClient.fetchPetition(decidimApiUrl, petitionId))
        .rejects.toThrow(PetitionNotFoundError);
      expect(axios.post).toBeCalledWith(decidimApiUrl, requestBody);
    });

    it('should request the petition data with the appropriate language', async () => {
      const languageServiceForSpanish = getLanguageServiceMock('es');
      axios.post.mockResolvedValue(petitionFromDecidim);

      await new DecidimClient(languageServiceForSpanish).fetchPetition(decidimApiUrl, petitionId);

      expect(axios.post).toBeCalledWith(decidimApiUrl, requestBodyForSpanish);
    });
  });
});

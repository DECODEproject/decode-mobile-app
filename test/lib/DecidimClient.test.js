import axios from 'axios';
import DecidimClient from '../../lib/DecidimClient';
import LanguageService from '../../lib/LanguageService';
import FetchPetitionError from '../../lib/errors/FetchPetitionError';

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
    const residencyAttribute = {
      scope: 'can-access',
      object: 'Barcelona',
      predicate: 'schema:addressLocality',
      provenance: {
        url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
      },
    };
    const dateOfBirthAttribute = {
      scope: 'can-access',
      object: 'voter',
      predicate: 'schema:dateOfBirth',
    };
    const genderAttribute = {
      scope: 'can-access',
      object: 'voter',
      predicate: 'schema:gender',
    };
    const petitionFromDecidim = {
      data: {
        data: {
          petition: {
            id: petitionId,
            title: {
              es: 'Plan de Actuacion municipal',
              ca: "Pla d'Actuació Municipal",
            },
            description: {
              es: 'Descripcion de peticion',
              ca: 'This is an amazing petition that you want to participate in',
            },
            json_schema: {
              optional: [
                dateOfBirthAttribute,
                genderAttribute,
              ],
              mandatory: [
                residencyAttribute,
              ],
            },
          },
        },
      },
    };
    const decidimClient = new DecidimClient(getLanguageServiceMock(), decidimApiUrl);

    const requestQuery = `{
      petition(id: "${petitionId}") {
        id
        title
        description
        json_schema
      }
    }`.replace(/\n/g, '');

    const requestBody = { query: requestQuery };

    it('should return the petition from Decidim API', async () => {
      const expectedPetition = {
        petition: {
          id: petitionId,
          title: petitionFromDecidim.data.data.petition.title.ca,
          description: petitionFromDecidim.data.data.petition.description.ca,
          attributes: {
            mandatory: [
              residencyAttribute,
            ],
            optional: [
              dateOfBirthAttribute,
              genderAttribute,
            ],
          },
        },
      };

      axios.post.mockResolvedValue(petitionFromDecidim);
      const actualPetition = await decidimClient.fetchPetition(petitionId);

      expect(actualPetition).toEqual(expectedPetition);
      expect(axios.post).toBeCalledWith(decidimApiUrl, requestBody);
    });

    it('should return an error if there is a problem fetching from Decidim', async () => {
      axios.post.mockImplementation(() => Promise.reject(new Error('Failed post')));

      await expect(decidimClient.fetchPetition(petitionId))
        .rejects.toThrow(FetchPetitionError);
      expect(axios.post).toBeCalledWith(decidimApiUrl, requestBody);
    });

    it('should return an error if fetch was successful but petition does not exist', async () => {
      const errorResponse = {
        data: null,
        errors: [
          {
            message: 'Cannot return null for non-nullable field Query.petition',
          },
        ],
      };

      axios.post.mockResolvedValue(errorResponse);

      await expect(decidimClient.fetchPetition(petitionId))
        .rejects.toThrow();
      expect(axios.post).toBeCalledWith(decidimApiUrl, requestBody);
    });

    it('should default to Spanish if language translation is not provided by Decidim', async () => {
      const expectedPetition = {
        petition: {
          id: petitionId,
          title: petitionFromDecidim.data.data.petition.title.es,
          description: petitionFromDecidim.data.data.petition.description.es,
          attributes: {
            mandatory: [
              residencyAttribute,
            ],
            optional: [
              dateOfBirthAttribute,
              genderAttribute,
            ],
          },
        },
      };

      axios.post.mockResolvedValue(petitionFromDecidim);
      const italianDecidimClient = new DecidimClient(getLanguageServiceMock('it'), decidimApiUrl);
      const actualPetition = await italianDecidimClient.fetchPetition(petitionId);

      expect(actualPetition).toEqual(expectedPetition);
      expect(axios.post).toBeCalledWith(decidimApiUrl, requestBody);
    });
  });
});

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import goToPetition from '../../../../../application/redux/actions/home';

jest.mock('../../../../../application/redux/actions/navigation', () => ({
  goToError: jest.fn().mockReturnValue({
    type: 'GO_TO_ERROR',
  }),
  goToPetitionSummary: jest.fn().mockReturnValue({
    type: 'GO_TO_PETITION_SUMMARY',
  }),
  goToAttributesSummary: jest.fn().mockReturnValue({
    type: 'GO_TO_ATTRIBUTES_SUMMARY',
  }),
}));

jest.mock('../../../../../application/redux/actions/petition', () => ({
  getPetition: jest.fn().mockReturnValue({
    type: 'GET_PETITION',
  }),
}));

describe('goToPetition', () => {
  const decidimClientMock = jest.fn();
  const petitionId = 2;
  const mockStore = configureStore([thunk]);

  describe('if there was an error getting the petition', () => {
    it('should dispatch goToError action', async () => {
      const initialState = {
        petition: {
          petitionError: 'Some error',
        },
      };
      const store = mockStore(initialState);

      await store.dispatch(goToPetition(decidimClientMock, petitionId));

      const actions = store.getActions();
      expect(actions).toEqual(expect.arrayContaining([{
        type: 'GO_TO_ERROR',
      }]));
    });
  });

  describe('if getting the petition was successful', () => {
    it('should dispatch go to petition summary action if attribute is verified (eg: addressLocality)', async () => {
      const attribute = {
        predicate: 'schema:addressLocality',
        object: 'Barcelona',
        scope: 'can-access',
        credentialIssuer: {
          url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
        },
      };
      const initialState = {
        petition: {
          petitionError: undefined,
        },
        attributes: {
          list: new Map().set('schema:addressLocality', attribute),
        },
      };
      const store = mockStore(initialState);

      await store.dispatch(goToPetition(decidimClientMock, petitionId));

      const actions = store.getActions();
      expect(actions).toEqual(expect.arrayContaining([{
        type: 'GO_TO_PETITION_SUMMARY',
      }]));
    });

    it('should dispatch go to attributes summary action if attribute is not verified', async () => {
      const attribute = {
        predicate: 'schema:district',
        object: 'Gracia',
        scope: 'can-access',
        credentialIssuer: {
          url: '',
        },
      };
      const initialState = {
        petition: {
          petitionError: undefined,
        },
        attributes: {
          list: new Map().set('schema:district', attribute),
        },
      };
      const store = mockStore(initialState);

      await store.dispatch(goToPetition(decidimClientMock, petitionId));

      const actions = store.getActions();
      expect(actions).toEqual(expect.arrayContaining([{
        type: 'GO_TO_ATTRIBUTES_SUMMARY',
      }]));
    });
  });
});

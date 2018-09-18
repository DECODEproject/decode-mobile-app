import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { getPetition, signPetition, toggleEnableAttribute } from '../../../../../application/redux/actions/petition';
import types from '../../../../../application/redux/actionTypes';
import DecidimClient from '../../../../../lib/DecidimClient';
import ChainspaceClient from '../../../../../lib/ChainspaceClient';
import FetchPetitionError from '../../../../../lib/errors/FetchPetitionError';
import UnexpectedChainspaceError from '../../../../../lib/errors/UnexpectedChainspaceError';
import Transaction from '../../../../../lib/Transaction';
import ZenroomContract from '../../../../../lib/ZenroomContract';

jest.mock('../../../../../lib/DecidimClient.js');
jest.mock('../../../../../lib/ChainspaceClient.js');
jest.mock('../../../../../lib/ZenroomContract.js');


const mockStore = configureMockStore([thunk]);

describe('getPetition', () => {
  const petitionLink = 'petitions';
  const decidimAPIUrl = 'decidim.com';
  const petitionId = '2';
  let store;

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('feature toggle decidimApi off', () => {
    beforeEach(() => {
      store = mockStore({
        featureToggles: {
          decidimApi: false,
        },
      });
    });

    it('should dispatch successful action', () => {
      const petitionFromDecidim = {
        petition: {
          id: '2',
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

      const expectedActions = [{
        type: types.SET_PETITION,
        petition: petitionFromDecidim,
        walletAttributes: new Map(),
      }];

      fetchMock.getOnce(petitionLink, petitionFromDecidim);

      return store.dispatch(getPetition(null, petitionLink)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch error action', () => {
      const errorMessage = 'Internal Server Error';

      const expectedActions = [{
        type: types.SET_PETITION_ERROR,
        error: errorMessage,
      }];

      fetchMock.getOnce(petitionLink, {
        status: 500,
        sendAsJson: false,
        body: errorMessage,
      });

      return store.dispatch(getPetition(null, petitionLink)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('feature toggle decidimApi on', () => {
    beforeEach(() => {
      store = mockStore({
        featureToggles: {
          decidimApi: true,
        },
      });
    });

    it('should dispatch successful action', () => {
      const expectedPetition = {
        id: petitionId,
        title: "Pla d'Actuació Municipal",
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
      };

      const decidimResult = {
        petition: expectedPetition,
      };

      const expectedActions = [{
        type: types.SET_PETITION,
        petition: expectedPetition,
        walletAttributes: new Map(),
      }];

      DecidimClient.mockImplementation(() => ({
        fetchPetition: () => (decidimResult),
      }));

      const client = new DecidimClient();
      return store.dispatch(getPetition(client, petitionLink, decidimAPIUrl, petitionId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should dispatch error action', async () => {
      DecidimClient.mockImplementation(() => ({
        fetchPetition: () => { throw new FetchPetitionError(); },
      }));

      await store.dispatch(getPetition(new DecidimClient(), petitionLink, petitionId));

      const expectedActions = [{
        type: types.SET_PETITION_ERROR,
        error: 'Could not retrieve petition details',
      }];
      await expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('signPetition', () => {
  describe('feature toggle zenroom off', () => {
    let store;

    const petition = {
      id: 1,
    };
    const walletId = '1234567890';
    const walletProxyLink = 'wallet-proxy-link.com';
    const signPetitionLink = `${walletProxyLink}/sign/petitions/${petition.id}`;
    const response = {};

    beforeEach(() => {
      store = mockStore({
        featureToggles: {
          zenroom: false,
        },
      });
    });

    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('should make post with correct request', () => {
      const vote = 'yes';
      const age = '0-19';
      const gender = 'undisclosed';

      const expectedRequestBody = JSON.stringify({
        signatory: walletId.substring(0, 5),
        vote,
        age,
        gender,
      });

      let actualRequestBody;

      fetchMock.postOnce((url, opts) => {
        actualRequestBody = opts.body;
        return url === signPetitionLink;
      }, response);

      return store.dispatch(signPetition(petition, walletId, walletProxyLink, vote, age, gender))
        .then(() => {
          expect(actualRequestBody).toEqual(expectedRequestBody);
        });
    });

    it('should dispatch successful action', () => {
      const expectedActions = [{
        type: types.SIGN_PETITION,
      }];

      fetchMock.postOnce(signPetitionLink, response);

      return store.dispatch(signPetition(petition, walletId, walletProxyLink)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch error action', () => {
      const errorMessage = 'Internal Server Error';

      const expectedActions = [{
        type: types.SIGN_PETITION_ERROR,
        error: errorMessage,
      }];

      fetchMock.postOnce(signPetitionLink, {
        status: 500,
        sendAsJson: true,
        body: {
          error: errorMessage,
        },
      });

      return store.dispatch(signPetition(petition, walletId, walletProxyLink)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe('Toggle enable attributes', () => {
      it('toggle attribute action', async () => {
        const attribute = 'schema:addressLocality';

        const expectedActions = [{
          type: types.TOGGLE_ENABLE_ATTRIBUTE,
          attribute,
        }];

        store.dispatch(toggleEnableAttribute(attribute));
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('feature toggle zenroom on', () => {
    let store;

    const petition = {
      id: 1,
    };
    const walletId = '1234567890';
    const walletProxyLink = 'wallet-proxy-link.com';
    const response = {};
    const vote = 'yes';
    const age = '0-19';
    const gender = 'undisclosed';

    const expectedTransaction = new Transaction({ outputs: [] });

    ZenroomContract.mockImplementation(() => ({
      addSignature: () => expectedTransaction,
    }));

    const zenroomContract = new ZenroomContract();

    beforeEach(() => {
      store = mockStore({
        featureToggles: {
          zenroom: true,
        },
      });
    });

    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('should dispatch successful action', () => {
      ChainspaceClient.mockImplementation(() => ({
        fetchObjectsOfLastTransaction: () => response,
        postTransaction: jest.fn(),
      }));

      const expectedActions = [{
        type: types.SIGN_PETITION,
      }];

      return store.dispatch(signPetition(
        petition,
        walletId,
        walletProxyLink,
        vote,
        age,
        gender,
        new ChainspaceClient(),
        zenroomContract,
      )).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch error action if fetching objects of last transaction fails', () => {
      const errorMessage = 'some error message';

      ChainspaceClient.mockImplementation(() => ({
        fetchObjectsOfLastTransaction: () => {
          throw new UnexpectedChainspaceError(errorMessage);
        },
      }));

      const expectedActions = [{ type: types.SIGN_PETITION_ERROR, error: errorMessage }];

      return store.dispatch(signPetition(
        petition,
        walletId,
        walletProxyLink,
        vote,
        age,
        gender,
        new ChainspaceClient(),
      )).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should make post with correct request', () => {
      ChainspaceClient.mockImplementation(() => ({
        fetchObjectsOfLastTransaction: () => response,
        postTransaction: jest.fn(),
      }));

      const chainspaceClient = new ChainspaceClient();

      const expectedActions = [
        { type: types.SIGN_PETITION },
      ];

      return store.dispatch(signPetition(
        petition,
        walletId,
        walletProxyLink,
        vote,
        age,
        gender,
        chainspaceClient,
        zenroomContract,
      )).then(() => {
        expect(chainspaceClient.postTransaction).toBeCalledWith(expectedTransaction);
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    xit('should return error if chainspace returns not 200 when posting transaction', () => {});
    xit('should return error if chainspace returns success false when posting transaction', () => {});
  });
});

describe('toggleEnableAttribute', () => {
  it('toggle attribute action', async () => {
    const store = mockStore({
      featureToggles: {
        zenroom: false,
      },
    });

    const attribute = 'schema:addressLocality';

    const expectedActions = [{
      type: types.TOGGLE_ENABLE_ATTRIBUTE,
      attribute,
    }];

    store.dispatch(toggleEnableAttribute(attribute));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

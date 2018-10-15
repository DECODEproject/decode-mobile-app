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
  const petitionId = '2';
  let store;

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  beforeEach(() => {
    store = mockStore();
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
    return store.dispatch(getPetition(client, petitionId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch error action when there is an error fetching the petition', async () => {
    DecidimClient.mockImplementation(() => ({
      fetchPetition: () => { throw new FetchPetitionError(); },
    }));

    await store.dispatch(getPetition(new DecidimClient()));

    const expectedActions = [{
      type: types.SET_PETITION_ERROR,
      error: 'Could not retrieve petition details',
    }];
    await expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('signPetition', () => {
  let store;

  const response = {};
  const vote = 'yes';
  const age = '0-19';
  const gender = 'undisclosed';
  const district = '1';

  const expectedTransaction = new Transaction({ outputs: [] });

  ZenroomContract.mockImplementation(() => ({
    addSignature: () => 'zenroomOutput',
    buildTransaction: () => expectedTransaction,
  }));

  const zenroomContract = new ZenroomContract();

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch successful action', () => {
    ChainspaceClient.mockImplementation(() => ({
      fetchLastTransaction: () => response,
      postTransaction: jest.fn(),
    }));

    const expectedActions = [{
      type: types.SIGN_PETITION,
    }];

    return store.dispatch(signPetition(
      vote,
      age,
      gender,
      district,
      new ChainspaceClient(),
      zenroomContract,
    )).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch error action if posting transaction fails', () => {
    const errorMessage = 'some error message';

    ChainspaceClient.mockImplementation(() => ({
      fetchLastTransaction: () => {
        throw new UnexpectedChainspaceError(errorMessage);
      },
    }));

    const expectedActions = [{ type: types.SIGN_PETITION_ERROR, error: errorMessage }];

    return store.dispatch(signPetition(
      vote,
      age,
      gender,
      district,
      new ChainspaceClient(),
    )).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should make post with correct request', () => {
    ChainspaceClient.mockImplementation(() => ({
      fetchLastTransaction: () => response,
      postTransaction: jest.fn(),
    }));

    const chainspaceClient = new ChainspaceClient();

    const expectedActions = [
      { type: types.SIGN_PETITION },
    ];

    return store.dispatch(signPetition(
      vote,
      age,
      gender,
      district,
      chainspaceClient,
      zenroomContract,
    )).then(() => {
      expect(chainspaceClient.postTransaction).toBeCalledWith(expectedTransaction);
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('toggleEnableAttribute', () => {
  it('toggle attribute action', async () => {
    const store = mockStore();

    const attribute = 'schema:addressLocality';

    const expectedActions = [{
      type: types.TOGGLE_ENABLE_ATTRIBUTE,
      attribute,
    }];

    store.dispatch(toggleEnableAttribute(attribute));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

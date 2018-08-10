import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { getPetition, signPetition, toggleEnableAttribute } from '../../../../../application/redux/actions/petition';
import types from '../../../../../application/redux/actionTypes';

const mockStore = configureMockStore([thunk]);

describe('getPetition', () => {
  const petitionLink = 'petitions';
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
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

    return store.dispatch(getPetition(petitionLink)).then(() => {
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

    return store.dispatch(getPetition(petitionLink)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('signPetition', () => {
  let store;

  const petition = {
    id: 1,
  };
  const walletId = '1234567890';
  const walletProxyLink = 'wallet-proxy-link.com';
  const signPetitionLink = `${walletProxyLink}/sign/petitions/${petition.id}`;
  const response = {};

  beforeEach(() => {
    store = mockStore();
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
      age: '0-19',
      gender: 'undisclosed',
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
      const attributeValue = 'schema:addressLocality';

      const expectedActions = [{
        type: types.TOGGLE_ENABLE_ATTRIBUTE,
        attributeValue,
      }];

      store.dispatch(toggleEnableAttribute(attributeValue));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

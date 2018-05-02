import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addCredentialFromUrl, storeCredentials, addCredential } from '../../../../application/redux/actions/attributes';
import types from '../../../../application/redux/actionTypes';

const mockStore = configureMockStore([thunk]);

describe('attribute action', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      attributes: [],
    });
  });

  it('ADD Attribute action', () => {
    const attribute = {
      predicate: 'schema:addressLocality',
      object: 'Barcelona',
      scope: 'can-access',
      credentialIssuer: {
        url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
      },
    };
    const walletId = '(21323123123)';
    const url = 'exp://localhost:19000/+?credential=0123456789';


    const expectedActions = [{
      type: types.ADD_CREDENTIAL_FROM_URL,
      attribute,
      walletId,
      credential: '0123456789',
    }];

    store.dispatch(addCredentialFromUrl(attribute, walletId, url));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('SAVE current credentials action when no credentials in the state', async () => {
    store = mockStore({
      attributes: [],
    });
    const setItemAsync = jest.fn().mockReturnValue(Promise.resolve(0));

    await store.dispatch(storeCredentials(setItemAsync));

    expect(setItemAsync).toBeCalled();
    expect(setItemAsync).toBeCalledWith('attributes', []);

    expect(store.getActions()).toEqual([{
      type: types.STORE_ATTRIBUTES,
      attributes: [],
    }]);
  });

  it('SAVE current credentials action when only one credential', async () => {
    const barcelonaResidencyAttribute = {
      predicate: 'schema:addressLocality',
      object: 'Barcelona',
      scope: 'can-access',
      provenance: {
        source: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
        credentials: '0123456789',
      },
      subject: '(Alpaca)',
    };
    store = mockStore({
      attributes: [barcelonaResidencyAttribute],
    });
    const setItemAsync = jest.fn().mockReturnValue(Promise.resolve(0));

    await store.dispatch(storeCredentials(setItemAsync));

    expect(setItemAsync).toBeCalled();
    expect(setItemAsync).toBeCalledWith('attributes', [barcelonaResidencyAttribute]);

    expect(store.getActions()).toEqual([{
      type: types.STORE_ATTRIBUTES,
      attributes: [barcelonaResidencyAttribute],
    }]);
  });

  it('addCredential when there is no credentials yet', async () => {
    store = mockStore({
      attributes: [],
    });
    const setItemAsync = jest.fn().mockReturnValue(Promise.resolve(0));
    const attribute = {
      predicate: 'schema:addressLocality',
      object: 'Barcelona',
      scope: 'can-access',
      credentialIssuer: {
        url: 'http://atlantis-decode.s3-website-eu-west-1.amazonaws.com',
      },
    };
    const walletId = '(21323123123)';
    const url = 'exp://localhost:19000/+?credential=0123456789';

    await store.dispatch(addCredential(attribute, walletId, url, setItemAsync));

    expect(setItemAsync).toBeCalled();
    expect(setItemAsync).toBeCalledWith('attributes', []);
    expect(store.getActions()).toEqual([
      {
        type: types.ADD_CREDENTIAL_FROM_URL,
        attribute,
        walletId,
        credential: '0123456789',
      }, {
        type: types.STORE_ATTRIBUTES,
        attributes: [],
      }]);
  });
});

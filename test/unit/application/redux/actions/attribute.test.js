import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addCredentialFromUrl, storeCredentials, addCredential, loadCredentials, bubbleUpRequiredAttributeToggle, bubbleUpOptionalAttributeToggle } from '../../../../../application/redux/actions/attributes';
import types from '../../../../../application/redux/actionTypes';

const mockStore = configureMockStore([thunk]);

describe('attribute action', () => {
  let store;
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

  beforeEach(() => {
    store = mockStore({
      attributes: {
        list: [],
      },
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
      attributes: {
        list: [],
      },
    });
    const setItemAsync = jest.fn().mockReturnValue(Promise.resolve(0));

    await store.dispatch(storeCredentials(setItemAsync));

    expect(setItemAsync).toBeCalled();
    expect(setItemAsync).toBeCalledWith('attributes', '[]');

    expect(store.getActions()).toEqual([{
      type: types.STORE_ATTRIBUTES,
      attributes: [],
    }]);
  });

  it('SAVE current credentials action when only one credential', async () => {
    store = mockStore({
      attributes: {
        list: [barcelonaResidencyAttribute],
      },
    });
    const setItemAsync = jest.fn().mockReturnValue(Promise.resolve(0));

    await store.dispatch(storeCredentials(setItemAsync));

    expect(setItemAsync).toBeCalled();
    expect(setItemAsync).toBeCalledWith('attributes', JSON.stringify([barcelonaResidencyAttribute]));

    expect(store.getActions()).toEqual([{
      type: types.STORE_ATTRIBUTES,
      attributes: [barcelonaResidencyAttribute],
    }]);
  });

  it('addCredential when there is no credentials yet', async () => {
    store = mockStore({
      attributes: {
        list: [],
      },
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
    expect(setItemAsync).toBeCalledWith('attributes', '[]');
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

  it('load credentials when nothing is stored', async () => {
    const credentials = [];
    const getItemAsync = jest.fn().mockReturnValue(Promise.resolve(JSON.stringify(credentials)));

    await store.dispatch(loadCredentials(getItemAsync));

    expect(getItemAsync).toBeCalled();
    expect(getItemAsync).toBeCalledWith('attributes');
    expect(store.getActions()).toEqual([{
      type: types.LOAD_ATTRIBUTES,
      attributes: [],
    }]);
  });

  it('load credentials when one attribute is stored', async () => {
    const credentials = [barcelonaResidencyAttribute];
    const getItemAsync = jest.fn().mockReturnValue(Promise.resolve(JSON.stringify(credentials)));

    await store.dispatch(loadCredentials(getItemAsync));

    expect(getItemAsync).toBeCalled();
    expect(getItemAsync).toBeCalledWith('attributes');
    expect(store.getActions()).toEqual([{
      type: types.LOAD_ATTRIBUTES,
      attributes: [barcelonaResidencyAttribute],
    }]);
  });

  it('toggle required attribute action', async () => {
    const toggleValue = false;

    const expectedActions = [{
      type: types.TOGGLE_REQUIRED_ATTRIBUTE,
      toggleValue,
    }];

    store.dispatch(bubbleUpRequiredAttributeToggle(toggleValue));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('toggle optional attribute action', async () => {
    const expectedActions = [{
      type: types.TOGGLE_OPTIONAL_ATTRIBUTE,
      attributeName: 'age',
      toggleValue: true,
    }, {
      type: types.TOGGLE_OPTIONAL_ATTRIBUTE,
      attributeName: 'gender',
      toggleValue: false,
    }];

    store.dispatch(bubbleUpOptionalAttributeToggle('age', true));
    store.dispatch(bubbleUpOptionalAttributeToggle('gender', false));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

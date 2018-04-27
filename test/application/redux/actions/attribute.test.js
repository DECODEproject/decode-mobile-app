import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import addCredentialFromUrl from '../../../../application/redux/actions/attribute';
import types from '../../../../application/redux/actionTypes';

const mockStore = configureMockStore([thunk]);

describe('attribute action', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
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
});

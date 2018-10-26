import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { setCredential, checkComingFromLogin, doLogin } from '../../../../../application/redux/actions/login';
import Attribute from '../../../../../lib/Attribute';
import types from '../../../../../application/redux/actionTypes';
import * as entryPoint from '../../../../../lib/entryPoint';

describe('setCredential', () => {
  const credential = new Attribute({
    predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
  }, '6c347975ca6aac24b46d9749808ae5392816ac23988e5dc46df4b85c0a', '');
  let setItemMock;
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    setItemMock = jest.fn().mockResolvedValue();
  });

  it('should save a credential on the phone\'s local storage for the first time', async () => {
    const initialState = {
      credentials: [],
    };
    const store = mockStore(initialState);
    const expectedActions = [{
      type: types.SET_CREDENTIALS,
      credentials: [credential],
    }];

    await store.dispatch(setCredential(setItemMock, credential));

    expect(setItemMock).toBeCalledWith('credentials', JSON.stringify([credential]));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should replace credential on the phone\'s local storage', async () => {
    const existingCredential = new Attribute({
      predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
    }, 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6', '');
    const initialState = {
      credentials: [existingCredential],
    };
    const store = mockStore(initialState);

    await store.dispatch(setCredential(setItemMock, credential));

    expect(setItemMock).toHaveBeenCalledWith('credentials', JSON.stringify([credential]));
  });
});

describe('checkComingFromLogin', () => {
  it('should check if its coming from login and set state to true', async () => {
    const initialState = {
      credentials: [],
      isComingFromLogin: false,
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);

    const expectedActions = [{
      type: types.COMING_FROM_LOGIN,
    }];


    entryPoint.isComingFromLogin = jest.fn().mockResolvedValue(true);

    await store.dispatch(checkComingFromLogin());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should check if its coming from login and set state to false', async () => {
    const initialState = {
      credentials: [],
      isComingFromLogin: true,
    };
    const mockStore = configureStore([thunk]);
    const store = mockStore(initialState);

    const expectedActions = [{
      type: types.NOT_COMING_FROM_LOGIN,
    }];

    entryPoint.isComingFromLogin = jest.fn().mockResolvedValue(false);

    await store.dispatch(checkComingFromLogin());

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('doLogin', () => {
  const initialState = {
    credentials: [],
    isComingFromLogin: false,
  };
  let store;
  const credential = new Attribute({
    predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
  }, 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6', '');


  beforeEach(() => {
    const mockStore = configureStore([thunk]);
    store = mockStore(initialState);
  });

  it('should dispatch LOGIN_SUCCEED action if request was successful', async () => {
    const someSessionId = '9876';
    const someCallback = 'http://bcnnow.decodeproject.eu/wallet-login';
    entryPoint.getLoginParameters = jest.fn().mockResolvedValue({
      callback: someCallback,
      sessionId: someSessionId,
    });
    const expectedActions = [{
      type: types.LOGIN_SUCCEEDED,
    }];
    const requestLogin = jest.fn().mockResolvedValue(true);

    await store.dispatch(doLogin(requestLogin, credential));

    expect(store.getActions()).toEqual(expectedActions);
    expect(requestLogin).toHaveBeenCalledWith(someCallback, someSessionId, credential);
  });

  it('should dispatch LOGIN_FAILED action if request NOT was successful', async () => {
    const someSessionId = '1234';
    const someCallback = 'http://another-callback.com/login';
    entryPoint.getLoginParameters = jest.fn().mockResolvedValue({
      callback: someCallback,
      sessionId: someSessionId,
    });

    const expectedActions = [{
      type: types.LOGIN_FAILED,
    }];

    const requestLogin = jest.fn().mockResolvedValue(false);

    await store.dispatch(doLogin(requestLogin, credential));

    expect(store.getActions()).toEqual(expectedActions);
    expect(requestLogin).toHaveBeenCalledWith(someCallback, someSessionId, credential);
  });

  it('should dispatch LOGIN_FAILED action if callback or session are undefined', async () => {
    entryPoint.getLoginParameters = jest.fn().mockResolvedValue({
      callback: undefined,
      sessionId: undefined,
    });

    const expectedActions = [{
      type: types.LOGIN_FAILED,
    }];

    const requestLogin = jest.fn().mockResolvedValue(false);

    await store.dispatch(doLogin(requestLogin, credential));

    expect(store.getActions()).toEqual(expectedActions);
    expect(requestLogin).toHaveBeenCalledWith(undefined, undefined, credential);
  });
});

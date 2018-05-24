import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import types from '../../../../../application/redux/actionTypes';
import { setSignOutcome } from '../../../../../application/redux/actions/signOutcome';

const mockStore = configureMockStore([thunk]);

describe('signOutcome', () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it('should dispatch successful action', () => {
    const signSuccess = true;

    const expectedActions = [{
      type: types.SIGN_OUTCOME,
      signSuccess,
    }];

    return store.dispatch(setSignOutcome(signSuccess)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch unsuccessful action', () => {
    const signSuccess = false;

    const expectedActions = [{
      type: types.SIGN_OUTCOME,
      signSuccess,
    }];

    return store.dispatch(setSignOutcome(signSuccess)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

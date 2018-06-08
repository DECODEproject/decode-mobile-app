import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createAuthorizationAction, { updatePin } from '../../../../../application/redux/actions/authorization';
import types from '../../../../../application/redux/actionTypes';

const mockStore = configureMockStore([thunk]);


describe('authorization with pin', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
    });
  });

  it('should return pinCorrect action if the pin is actually correct', async () => {
    const getStoredPinFn = jest.fn().mockReturnValue(Promise.resolve('1234'));
    const expectedActions = [{
      type: types.AUTHORIZATION_ACTION,
      pinCorrect: true,
    }];

    await store.dispatch(createAuthorizationAction('1234', getStoredPinFn));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return action with pinCorrect: false if the pin is wrong', async () => {
    const getStoredPinFn = jest.fn().mockReturnValue(Promise.resolve('1234'));
    const expectedActions = [{
      type: types.AUTHORIZATION_ACTION,
      pinCorrect: false,
    }];

    await store.dispatch(createAuthorizationAction('6666', getStoredPinFn));

    expect(store.getActions()).toEqual(expectedActions);
  });

  describe('updatePin', () => {
    it('should dispatch updatePin action', () => {
      const pin = '5555';
      const expectedActions = [{
        type: types.UPDATE_PIN_ACTION,
        pin,
      }];

      store.dispatch(updatePin(pin));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});


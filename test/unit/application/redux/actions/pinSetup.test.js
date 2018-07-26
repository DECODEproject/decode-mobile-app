import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import types from '../../../../../application/redux/actionTypes';
import { changeText1, changeText2, storePin } from '../../../../../application/redux/actions/pinSetup';

const mockStore = configureStore([thunk]);

describe('PinSetup actions', () => {
  const initialState = {
    pinSetup: {
      pin1: '',
      pin2: '',
      validated: false,
    },
  };
  it('should execute an action when pin1 is modified', () => {
    const store = mockStore(initialState);

    store.dispatch(changeText1('1234'));

    expect(store.getActions()).toEqual([{
      type: types.PIN_SETUP_TEXT1_CHANGED,
      pin: '1234',
    }]);
  });

  it('should execute an action when pin2 is modified', () => {
    const store = mockStore(initialState);

    store.dispatch(changeText2('1234'));

    expect(store.getActions()).toEqual([{
      type: types.PIN_SETUP_TEXT2_CHANGED,
      pin: '1234',
    }]);
  });

  it('should save the pin into the storage', async () => {
    const setItemAsync = jest.fn().mockReturnValue(Promise.resolve(0));
    const store = mockStore(initialState);

    await store.dispatch(storePin(setItemAsync, '6666'));

    expect(setItemAsync).toBeCalled();
    expect(setItemAsync).toBeCalledWith('pincode', '6666');
    expect(store.getActions()).toEqual([{
      type: types.PIN_SETUP_STORE,
    }]);
  });
});

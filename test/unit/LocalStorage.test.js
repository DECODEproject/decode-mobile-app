import { storePinInPhone, retrievePin } from '../../LocalStorage';

describe('LocalStorage', () => {
  it('storePinInPhone stores the pin in the SecureStore', async () => {
    const setItemAsync = jest.fn().mockReturnValue(Promise.resolve(0));

    await storePinInPhone(setItemAsync, '1234');

    expect(setItemAsync).toBeCalledWith('pincode', '1234');
  });

  it('retrievePin from SecureStorage', async () => {
    const expectedPin = '1234';
    const getItemAsync = jest.fn().mockReturnValue(Promise.resolve(expectedPin));

    const actualPin = await retrievePin(getItemAsync);

    expect(actualPin).toEqual(expectedPin);
  });
});


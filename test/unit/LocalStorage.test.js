import { storePinOnAppInitalization, retrievePin } from '../../LocalStorage';

describe('LocalStorage', () => {
  it('storePinOnAppInitalization always stores in the SecureStore the same pin code hardcoded - 1234', async () => {
    const setItemAsync = jest.fn().mockReturnValue(Promise.resolve(0));

    await storePinOnAppInitalization(setItemAsync);

    expect(setItemAsync).toBeCalled();
    expect(setItemAsync).toBeCalledWith('pincode', '1234');
  });

  it('retrievePin from SecureStorage', async () => {
    const expectedPin = '1234';
    const getItemAsync = jest.fn().mockReturnValue(Promise.resolve(expectedPin));

    const actualPin = await retrievePin(getItemAsync);

    expect(actualPin).toEqual(expectedPin);
  });
});


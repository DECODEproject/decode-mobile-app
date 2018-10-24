import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import setCredential from '../../../../../application/redux/actions/login';
import Attribute from '../../../../../lib/Attribute';

describe('setCredential', () => {
  const credential = new Attribute({
    predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
  }, '6c347975ca6aac24b46d9749808ae5392816ac23988e5dc46df4b85c0a', '');
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();
  const mockStore = configureStore([thunk]);

  it('should save a credential on the phone\'s local storage for the first time', async () => {
    const initialState = {
      credentials: [],
    };
    const store = mockStore(initialState);

    getItemMock.mockResolvedValue(null);
    await store.dispatch(setCredential(getItemMock, setItemMock, credential));

    expect(setItemMock).toBeCalledWith('credentials', JSON.stringify([credential]));
  });

  it('should add another credential on the phone\'s local storage', async () => {
    const existingCredential = new Attribute({
      predicate: 'schema:iotCommunity', object: 'MakingSense', scope: '', provenance: { url: 'https://making-sense.eu/credential-issuer' },
    }, 'd4e8471af6492cf80afb6591bbe63f909d8d07a6efbf052b11851e5cd6', '');
    const initialState = {
      credentials: [],
    };
    const store = mockStore(initialState);
    getItemMock.mockResolvedValue([existingCredential]);

    await store.dispatch(setCredential(getItemMock, setItemMock, credential));

    expect(setItemMock).toBeCalledWith('credentials', JSON.stringify([existingCredential, credential]));
  });
});
